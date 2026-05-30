const prod = require('../../helpers/prod');

module.exports = {
  rules: {
    'arrow-body-style': [prod(), 'as-needed'],
    'arrow-parens': [prod(), 'as-needed'],
    'arrow-spacing': prod(),
    'no-duplicate-imports': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-var': prod(),
    'object-shorthand': prod(),
    'prefer-arrow-callback': prod(),
    'prefer-const': prod(),
    'prefer-destructuring': prod(),
    'prefer-numeric-literals': 'error',
    'prefer-rest-params': prod(),
    'prefer-spread': 'error',
    'prefer-template': prod(),
    'rest-spread-spacing': ['error', 'never'],
    'template-curly-spacing': [prod(), 'never'],
  },
};
