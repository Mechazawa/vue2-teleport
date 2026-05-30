vue2-teleport
-------------
[![npm version](https://badge.fury.io/js/vue2-teleport.svg)](https://badge.fury.io/js/vue2-teleport)

This package is an alternative to [vue3's teleport component][oc-teleport]. You can use the documentation provided by vue as a starting point to using this package.

## Installation
```sh
npm install vue2-teleport
```

## Example

```vue
<template>
  <div>
      <button @click="modalOpen = true">
          Open full screen modal! (With teleport!)
      </button>
    
      <Teleport to="body">
        <div v-if="modalOpen" class="modal">
          <div>
            I'm a teleported modal! 
            (My parent is "body")
            <button @click="modalOpen = false">
              Close
            </button>
          </div>
        </div>
      </Teleport>
  </div>
</template>

<script>
import Teleport from 'vue2-teleport';

export default {
  components: {
    Teleport,
  },
  data() {
    return { 
      modalOpen: false
    }
  }
}
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `to` | `String \| HTMLElement` | _(required)_ | A CSS selector or DOM element the content is teleported into. |
| `where` | `String` | `'after'` | Where to insert relative to the target's existing children: `'after'` (append) or `'before'` (prepend). |
| `disabled` | `Boolean` | `false` | When `true`, the content stays in place instead of being teleported. |

## Multiple targets

If `to` is a selector that matches more than one element, the content is teleported into **every** match. The first match receives the live, reactive nodes; the additional matches receive static deep clones.

```vue
<Teleport to=".sidebar">
  <span class="badge">New</span>
</Teleport>
```

> **Note:** clones in the extra targets are static snapshots. They don't receive reactive updates or Vue event listeners, so use multiple targets for static content and prefer a single target for interactive content.

## License

This project is licensed under the [CC0-1.0 License][license].


[license]: /LICENSE
[oc-teleport]: https://vuejs.org/guide/built-ins/teleport.html
