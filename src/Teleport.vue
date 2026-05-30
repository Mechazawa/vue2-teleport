<template>
  <div :class="classes">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'teleport',
  props: {
    to: {
      type: [String, HTMLElement],
      required: true,
    },
    where: {
      type: String,
      default: 'after',
    },
    disabled: Boolean,
  },
  data() {
    return {
      nodes: [],
      waiting: false,
      observer: null,
      // The primary target holds the live (reactive) nodes; any additional
      // matching targets hold static deep clones (see `move`).
      parents: [],
      clones: [],
      moved: false,
    };
  },
  watch: {
    to: 'maybeMove',
    where: 'maybeMove',
    disabled(value) {
      if (value) {
        this.disable();
        // Ensure all event done.
        this.$nextTick(() => {
          this.teardownObserver();
        });
      } else {
        this.bootObserver();
        this.move();
      }
    },
  },
  mounted() {
    // Store a reference to the nodes
    this.nodes = Array.from(this.$el.childNodes);

    if (!this.disabled) {
      this.bootObserver();
    }

    // Move slot content to target
    this.maybeMove();
  },
  beforeDestroy() {
    // Fix nodes reference
    this.nodes = this.getComponentChildrenNode();

    // Move back
    this.disable();

    // Stop observing
    this.teardownObserver();
  },
  computed: {
    classes() {
      if (this.disabled) {
        return ['teleporter'];
      }

      return ['teleporter', 'hidden'];
    },
  },
  methods: {
    maybeMove() {
      if (!this.disabled) {
        this.move();
      }
    },
    move() {
      this.waiting = false;

      // `to` may be a single element or a selector matching one or many nodes.
      const parents = this.to instanceof HTMLElement
        ? [this.to]
        : Array.from(document.querySelectorAll(this.to));

      if (parents.length === 0) {
        this.disable();

        this.waiting = true;

        return;
      }

      // Drop clones from any previous placement. This never touches our host
      // element, so it can't retrigger the childNodes observer.
      this.removeClones();

      parents.forEach((parent, index) => {
        // The first target receives the real nodes (kept reactive). Moving them
        // straight into the target — never back through `this.$el` — keeps the
        // observers from looping. Extra targets receive static deep clones,
        // since a node can only live in one place.
        const fragment = index === 0
          ? this.getFragment()
          : this.getFragment(this.nodes.map(node => node.cloneNode(true)), this.clones);

        if (this.where === 'before') {
          parent.prepend(fragment);
        } else {
          parent.appendChild(fragment);
        }
      });

      this.parents = parents;
    },
    disable() {
      this.removeClones();

      if (this.parents.length > 0) {
        // Pull the live nodes back into our (hidden) host element. Resetting
        // `parents` first keeps a follow-up disable() from churning the host.
        this.parents = [];
        this.$el.appendChild(this.getFragment());
      }
    },
    removeClones() {
      this.clones.forEach(node => node.parentNode && node.parentNode.removeChild(node));
      this.clones = [];
    },
    // Using a fragment is faster because it'll trigger only a single reflow
    // See https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
    getFragment(nodes = this.nodes, track = null) {
      const fragment = document.createDocumentFragment();

      nodes.forEach((node) => {
        if (track) {
          track.push(node);
        }
        fragment.appendChild(node);
      });

      return fragment;
    },
    onMutations(mutations) {
      // Makes sure the move operation is only done once
      let shouldMove = false;

      for (let i = 0; i < mutations.length; i++) {
        const mutation = mutations[i];
        // Ignore nodes we manage ourselves (live nodes + clones) so our own
        // DOM writes don't retrigger a move.
        const filteredAddedNodes = Array.from(mutation.addedNodes)
          .filter(node => !this.nodes.includes(node) && !this.clones.includes(node));
        const removedParent = Array.from(mutation.removedNodes).some(node => this.parents.includes(node));

        // A target we were using disappeared (re-distribute to whatever still
        // matches, or fall back to waiting), or we're waiting and something new
        // showed up (a target may have appeared). move() handles both.
        if (removedParent || (this.waiting && filteredAddedNodes.length > 0)) {
          shouldMove = true;
        }
      }

      if (shouldMove) {
        this.move();
      }
    },
    bootObserver() {
      if (this.observer) {
        return;
      }

      this.observer = new MutationObserver(mutations => this.onMutations(mutations));

      this.observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false,
      });

      if (this.childObserver) {
        return;
      }
      // watch childNodes change
      this.childObserver = new MutationObserver(mutations => {
        const childChangeRecord = mutations.find(i => i.target === this.$el);
        if (childChangeRecord) {
          // Remove old nodes before update position.
          this.nodes.forEach((node) => node.parentNode && node.parentNode.removeChild(node));
          this.nodes = this.getComponentChildrenNode();
          this.maybeMove();
        }
      });

      this.childObserver.observe(this.$el, {
        childList: true,
        subtree: false,
        attributes: false,
        characterData: false,
      });
    },
    teardownObserver() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
      if (this.childObserver) {
        this.childObserver.disconnect();
        this.childObserver = null;
      }
    },
    getComponentChildrenNode() {
      return this.$vnode.componentOptions.children
        .map((i) => i.elm)
        .filter((i) => i);
    },
  },
};
</script>

<style scoped lang="scss">
.hidden {
  visibility: hidden;
  display: none;
}
</style>
