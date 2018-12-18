try {
  require('dotenv').config()
  var fs = require('fs');
  var homeDir = require('os').homedir();
} catch(err) {

}

var processEnv = process && process.env ? process.env : {};

module.exports.setConfig = function (localConfig) {
  localConfig = localConfig || {};
  // look for local credentials
  if (localConfig.hasOwnProperty('RF_CLIENT_ID') && localConfig.hasOwnProperty('RF_SECRET')) {
    return {
      RF_CLIENT_ID: localConfig.RF_CLIENT_ID,
      RF_SECRET: localConfig.RF_SECRET,
      NODE_ENV:  processEnv.NODE_ENV || "development",
      RF_BASE_URL: localConfig.RF_BASE_URL ||  'https://sandbox.api.routefusion.co'
    }
  }

  if (processEnv.hasOwnProperty('RF_CLIENT_ID') && processEnv.hasOwnProperty('RF_SECRET')) {
    return {
      RF_CLIENT_ID: processEnv.RF_CLIENT_ID,
      RF_SECRET: processEnv.RF_SECRET,
      NODE_ENV:  processEnv.NODE_ENV || "development",
      RF_BASE_URL: processEnv.RF_BASE_URL ||  'https://sandbox.api.routefusion.co'
    }
  }

  try {
    var credentials = getCredentialsFromFile();
    return {
      RF_CLIENT_ID: credentials.RF_CLIENT_ID,
      RF_SECRET: credentials.RF_SECRET,
      NODE_ENV:  processEnv.NODE_ENV || "development",
      RF_BASE_URL: credentials.RF_BASE_URL ||  'https://sandbox.api.routefusion.co'
    }
  } catch(err) {
    throw 'No credentials found';
  }

}

// searches routefusion credentials file for set profile or set environment variables and
// returns an array with user credentials
// e.g. [client_id, secret_key]
function getCredentialsFromFile() {
  // were using the syncronous reaadFile function here because we nee to acquire credentials before performing any other action
  // so we are okay with the exception here.
  var data = fs.readFileSync(homeDir + '/.rf/credentials', 'utf8');
  var file = data.split('\n');
  var profile = processEnv.RF_PROFILE || 'default';
  var index = file.indexOf('[' + profile + ']');

  // if we have a match, trim the elements, split on '=' and return the values in an object
  if (index !== -1) {
    return {
      RF_CLIENT_ID: file[index + 1].trim().split('=')[1],
      RF_SECRET: file[index + 2].trim().split('=')[1],
      RF_BASE_URL: file[index + 3].trim().split('=')[1] || ''
    };
  }

  return {};
};