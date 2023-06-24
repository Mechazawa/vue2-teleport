vue2-teleport
-------------
[![npm version](https://badge.fury.io/js/vue2-teleport.svg)](https://badge.fury.io/js/vue2-teleport)

This package is an alternative to [vue3's teleport component][oc-teleport]. You can use the documentation provided by vue as a starting point to using this package.

## Example

```
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

[oc-teleport]: https://vuejs.org/guide/built-ins/teleport.html
