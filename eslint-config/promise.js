module.exports = {
  plugins: [
    'promise',
  ],
  extends: 'plugin:promise/recommended',
  rules: {
    'promise/no-callback-in-promise': 'error',
    'promise/no-promise-in-callback': 'warn',
    'promise/prefer-await-to-callbacks': 'warn',
    'promise/prefer-await-to-then': 'warn',
  },
};
