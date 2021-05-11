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
      type: String,
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
      parents: new Set(),
    };
  },
  watch: {
    to: 'maybeMove',
    where: 'maybeMove',
    disabled(value) {
      if (value) {
        this.disable();
        this.teardownObserver();
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

      this.parents = document.querySelectorAll(this.to);

      if (this.parents.size === 0) {
        this.disable();

        this.waiting = true;

        return;
      }

      for (const parent of this.parents) {
        if (this.where === 'before') {
          parent.prepend(this.getFragment());
        } else {
          parent.appendChild(this.getFragment());
        }
      }
    },
    disable (parent = null) {
      if (parent) {
        this.parents.delete(parent);
      } else {
        this.parents.clear();
      }

      if (this.parents.size === 0) {
        this.$el.appendChild(this.getFragment());
      }
    },
    // Using a fragment is faster because it'll trigger only a single reflow
    // See https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
    getFragment() {
      const fragment = document.createDocumentFragment();

      this.nodes.forEach(node => fragment.appendChild(node));

      return fragment;
    },
    onMutations(mutations) {
      // Makes sure the move operation is only done once
      let shouldMove = false;

      for (let i = 0; i < mutations.length; i++) {
        const mutation = mutations[i];
        const filteredAddedNodes = Array.from(mutation.addedNodes).filter(node => !this.nodes.includes(node));

        for (const parent of this.parents) {
          if (Array.from(mutation.removedNodes).includes(parent)) {
            this.disable(parent);
            this.waiting = !this.disabled;
          } else if (this.waiting && filteredAddedNodes.length > 0) {
            shouldMove = true;
          }
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
    },
    teardownObserver() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
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
