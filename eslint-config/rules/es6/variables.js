const prod = require('../../helpers/prod');

module.exports = {
  rules: {
    'no-shadow': prod(),
    'no-undef': 'error',
    'no-undef-init': 'error',
    'no-unused-vars': [prod(), { 'vars': 'all', 'args': 'none', varsIgnorePattern: '^_' }],
    'no-use-before-define': ['error', { functions: false }],
  },
};
