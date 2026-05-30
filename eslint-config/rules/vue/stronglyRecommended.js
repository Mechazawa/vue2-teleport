const prod = require('../../helpers/prod');

module.exports = {
  rules: {
    'vue/html-closing-bracket-newline': [prod(), { multiline: 'never' }],
    'vue/html-closing-bracket-spacing': [prod(), { selfClosingTag: 'never' }],
    'vue/html-indent': [prod(), 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
    }],
    'vue/html-quotes': 'error',
    'vue/html-self-closing': ['error', {
      html: {
        void: 'any',
        normal: 'always',
        component: 'always',
      },
      svg: 'always',
      math: 'always',
    }],
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/name-property-casing': ['error', 'kebab-case'],
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
  },
};
