const prod = require('../../helpers/prod');

module.exports = {
  rules: {
    'no-async-promise-executor': 'error',
    'no-console': prod('off', 'warn'),
    'no-debugger': prod('off'),
    'no-dupe-else-if': 'error',
    'no-extra-parens': [prod(), 'all', {
      nestedBinaryExpressions: false,
      enforceForArrowConditionals: false,
      enforceForNewInMemberExpressions: false,
    }],
    'no-import-assign': 'error',
    'no-misleading-character-class': 'error',
    'no-prototype-builtins': 'off',
    'no-setter-return': 'error',
    'no-template-curly-in-string': 'error',
  },
};
