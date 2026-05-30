const prod = require('./helpers/prod');

module.exports = {
  extends: [
    '@vue/eslint-config-standard',
    'plugin:vue/strongly-recommended',
    './rules/vue/recommended.js',
    './rules/vue/stronglyRecommended.js',
  ],
  rules: {
    // Uncategorized
    'vue/array-bracket-spacing': [prod(), 'never'],
    'vue/arrow-spacing': prod(),
    'vue/block-spacing': [prod(), 'always'],
    'vue/brace-style': [prod(), '1tbs', { allowSingleLine: true }],
    'vue/camelcase': prod(),
    'vue/comma-dangle': [prod(), 'always-multiline'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      ignores: [
        'component',
        'router-view',
        'router-link',
        'slot',
        'keep-alive',
        'transition',
        'transition-group',
      ],
    }],
    'vue/dot-location': ['error', 'property'],
    'vue/eqeqeq': 'error',
    'vue/key-spacing': prod(),
    'vue/keyword-spacing': prod(),
    'vue/match-component-file-name': ['error', {
      extensions: ['jsx', 'vue'],
      shouldMatchCase: false,
    }],
    'vue/no-boolean-default': 'error',
    'vue/no-deprecated-scope-attribute': 'error',
    'vue/object-curly-spacing': [prod(), 'always'],
    'vue/require-direct-export': 'error',
    'vue/script-indent': [prod(), 2, {
      baseIndent: 1,
      switchCase: 1,
    }],
    'vue/space-infix-ops': ['error', { int32Hint: false }],
    'vue/space-unary-ops': 'error',
    'vue/v-on-function-call': 'error',
    'vue/valid-v-slot': 'error',
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
      },
    },
  ],
};
