module.exports = function prod (local = 'warn', production = 'error') {
  return ['testing', 'production'].includes(process.env.APP_ENV) ? production : local;
};
