const axios = require('axios');
const auth = require('./lib/auth');
const env = process.env.NODE_ENV || "development";

let client = {

  init: (config = {}) => {
    const credentials = auth.getCredentials(config)

    if (!credentials.clientId || !credentials.secretKey) throw new Error('clientId or secret not found');

    client.clientId = credentials.clientId;
    client.secret = credentials.secretKey;
    client.baseURL = config.baseURL || 'https://api-beta.routefusion.co/v1';
    return client;
  },


  // USERS

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

  // BENEFICIARIES

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
  },

  createBeneficiary: async (body) => {
    const path = '/beneficiaries/';

    let request = reqInstance(body);
    try {
      let response = await request.post(path, body);
      return response.data;
    } catch(err) {
      errorhandler(err);
    }
  },

  updateBeneficiary: async (id, body) => {
    const path = '/beneficiaries/' + id;

    let request = reqInstance(body);
    try {
      let response = await request.put(path, body);
      return response.data;
    } catch(err) {
      errorhandler(err);
    }
  },

  // TRANSFERS

  createTransfer: async (body) => {
    const path = '/transfers';

    let request = reqInstance(body);
    try {
      let response = await request.put(path, body);
      return response.data;
    } catch(err) {
      errorhandler(err);
    }
  },

  getTransfer: async (transferUuid) => {
    const path = `/transfers/${transferUuid}`;

    let request = reqInstance(path);
    try {
      let response = await request.get(path);
      return response.data;
    } catch(err) {
      errorhandler(err);
    }
  },

  getAllTransfers: async () => {
    const path = `/transfers`;

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
  return axios.create({
    baseURL: client.baseURL,
    headers: {
      'client-id': client.clientId,
      'signature': auth.createDigest(data, client.secret)
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