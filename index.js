const axios = require('axios');
const auth = require('./lib/auth');
const env = process.env.NODE_ENV || "development";
const config = require('./config/config')[env];

let client  = {

  getUser: async () => {
    const path = '/users/me';
    let request = reqInstance(path);
    try {
      let response = await request.get(path);
      return response.data;
    } catch(err) {
      if (err.data) {
        console.log(err.data);
      } else {
        errorhandler(err);
      }
    }
  },

  updateUser: async (body) => {
    if (typeof(body) !== 'object') {
      errorhandler( new Error('body must be an object') )
    }

    const path = '/users/me';
    let request = reqInstance(body);
    try {
      let response = await request.put(path, body);
      return response.data;
    } catch(err) {
      errorhandler(err);
    }
  },

  getBeneficiaries: async () => {
    const path = '/beneficiaries';
    let request = reqInstance(path);
    try {
      let response = await request.get(path);
      return response.data;
    } catch(err) {
      errorhandler(err);
    }
  },

  getBeneficiary: async (id) => {
    const path = '/beneficiaries/' + id;
    let request = reqInstance(path);
    try {
      let response = await request.get(path);
      return response.data;
    } catch(err) {
      errorhandler(err);
    }
  }
}

module.exports = client;

// for GET requests, data === path
// for POST requests, data === body
function reqInstance (data) {
  let credentials = auth.getCredentials();

  return axios.create({
    baseURL: config.apiUri,
    headers: {
      'client-id': credentials.clientId,
      'signature': auth.createDigest(data, credentials.secretKey)
    }
  })
}

function errorhandler(err) {
  let type = ['response', 'message', 'error'];

  Object.keys(err).forEach(e => {
    if (type.includes(e)) {
      if (e === 'response') {
        console.log(err[e].data);
        return err[e].data;
      }

      console.log(err[e]);
      return err[e];
    }
  })
}