const crypto = require('crypto');
const fs = require('fs');
const homeDir = require('os').homedir();

// for GET requests, data === path {String}
// for POST requests, data === body {Object}
function createDigest (data, secret) {
  if (typeof(data) === 'object')  {
    data = JSON.stringify(data);
  } else {
    // if data === path, add '/v1' to string
    data = '/v1' + data;
  }

  let signature = crypto.createHmac('sha512', secret);
  signature = signature.update(data);
  return signature.digest('base64');
}

// searches routefusion credentials file for set profile or set environment variables and
// returns an array with user credentials
// e.g. [client_id, secret_key]
function getCredentials (config = {}) {

  if (config.clientId && config.secret) {
    return { clientId: config.clientId, secretKey: config.secret }
  }

  // check if RF_PROFILE is set OR if either RF_CLIENT_ID OR RF_SECRET_KEY are not set
  if (process.env.RF_PROFILE || (!process.env.RF_CLIENT_ID || !process.env.RF_SECRET_KEY)) {

    // were using the syncronous reaadFile function here because we nee to acquire credentials before performing any other action
    // so we are okay with the exception here.
    let data = fs.readFileSync(homeDir + '/.rf/credentials', 'utf8')

    // turn each line into an array element
    let file = data.split('\n');

    // finds index of profile in array, returns -1 if not match
    let index = file.findIndex(e => e === `[${process.env.RF_PROFILE}]` || '[default]');

    // if we have a match, trim the elements, split on '=' and return the values in an object
    if (index !== -1) {
      return { clientId: file[index + 1].trim().split('=')[1], secretKey: file[index + 2].trim().split('=')[1] }
    }

  }

  // attempt to retrieve credentials from environment variables
  return { clientId: process.env.RF_CLIENT_ID, secretKey:process.env.RF_SECRET_KEY }

}

module.exports = {
  createDigest,
  getCredentials
}

