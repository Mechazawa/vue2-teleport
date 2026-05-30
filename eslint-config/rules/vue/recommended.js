module.exports = {
  rules: {
    'vue/no-v-html': 'off',
    'vue/order-in-components': ['error', {
      order: [
        'el',
        'name',
        'parent',
        'functional',
        'extends',
        ['delimiters', 'comments'],
        ['components', 'directives', 'filters'],
        'inheritAttrs',
        'mixins',
        'model',
        ['props', 'propsData'],
        'data',
        'watch',
        'LIFECYCLE_HOOKS',
        'computed',
        'methods',
        ['template', 'render'],
        'renderError',
      ],
    }],
    'vue/this-in-template': ['error', 'never'],
  },
};
