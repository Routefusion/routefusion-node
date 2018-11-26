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
    } catch (err) {
      console.log(err.data)
    }
  },

  getBeneficiaries: async () => {
    const path = '/beneficiaries';
    let request = reqInstance(path);
    try {
      let response = await request.get(path);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  },

  getBeneficiary: async (id) => {
    const path = '/beneficiaries/' + id;
    let request = reqInstance(path);
    try {
      let response = await request.get(path);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = client;

client.getBeneficiary(5).then(resp => console.log(resp))



function reqInstance (path, body) {
  let credentials = auth.getCredentials();

  return axios.create({
    baseURL: config.apiUri,
    headers: {
      'client-id': credentials.clientId,
      'signature': auth.createDigest(path, body, credentials.secretKey)
    },
    data: body ? body : null
  })
}