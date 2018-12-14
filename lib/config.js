try {
  require('dotenv').config()
  var fs = require('fs');
  var homeDir = require('os').homedir();
} catch(err) {

}

var processEnv = process && process.env ? process.env : {};
var credentials = getCredentials();


module.exports = Object.assign(processEnv, {
  NODE_ENV:  processEnv.NODE_ENV || "developmenet",
  RF_CLIENT_ID: processEnv.RF_CLIENT_ID || credentials.RF_CLIENT_ID || '',
  RF_SECRET: processEnv.RF_SECRET || credentials.RF_SECRET || '',
  RF_BASE_URL: processEnv.RF_BASE_URL ||  'https://sandbox.api.routefusion.co'
});

// searches routefusion credentials file for set profile or set environment variables and
// returns an array with user credentials
// e.g. [client_id, secret_key]
function getCredentials() {
  var credentials = {};
  try {
    credentials = getCredentialsFromFile();
  } catch(err) {
    throw err;
  }
  return credentials;
};

function getCredentialsFromFile() {
  // were using the syncronous reaadFile function here because we nee to acquire credentials before performing any other action
  // so we are okay with the exception here.
  var data = fs.readFileSync(homeDir + '/.rf/credentials', 'utf8')
  var file = data.split('\n');
  var profile = processEnv.RF_PROFILE || 'default';
  var index = file.indexOf('[' + profile + ']')

  // if we have a match, trim the elements, split on '=' and return the values in an object
  if (index !== -1) {
    return { RF_CLIENT_ID: file[index + 1].trim().split('=')[1], RF_SECRET: file[index + 2].trim().split('=')[1] };
  }

  return {};
};