const actions = require('./lib/actions');
const config = require('./lib/config');

function client(localConfig) {
  localConfig = localConfig || {};

  if (localConfig.hasOwnProperty('RF_CLIENT_ID') && localConfig.hasOwnProperty('RF_SECRET')) return actions(localConfig);

  return actions(config.setConfig());
};

module.exports.Instance = function(localConfig) {
  localConfig = localConfig || {};
  return client(localConfig);
};