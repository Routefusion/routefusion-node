var axios = require('axios');
var auth = require('./auth');
var config = require('../lib/config');
var _config;

module.exports = function (config) {
  // set global config
  _config = config || {};

  return {
    // USERS
    getUser: function () {
      return reqInstance('GET', '/users/me')
    },

    updateUser: function (body) {
      // check body is not null, not an array, is a valid object
      if (body !== null && !(body instanceof Array) && typeof body !== 'object') {
        return Promise.reject(function () {
          throw Error('body must be an object');
        });
      }
      return reqInstance('PUT', '/users/me', body);
    },

    // MASTER USERS
    getUserByUUid: function (uuid) {
      return reqInstance('GET', '/users/me/user/' + uuid)
    },

    getUsers: function (uuid) {
      return reqInstance('GET', '/users/me/users/')
    },

    updateUserByUUid: function (uuid, body) {
      // check body is not null, not an array, is a valid object
      if (body !== null && !(body instanceof Array) && typeof body !== 'object') {
        return Promise.reject(function () {
          throw Error('body must be an object');
        });
      }

      return reqInstance('PUT', '/users/me/user/' + uuid, body)
    },

    createUserByUUid: function (body) {
      // check body is not null, not an array, is a valid object
      if (body !== null && !(body instanceof Array) && typeof body !== 'object') {
        return Promise.reject(function () {
          throw Error('body must be an object');
        });
      }

      return reqInstance('POST', '/users/me/user/', body)
    },

    // BENEFICIARIES

    getBeneficiaries: function () {
      return reqInstance('GET', '/beneficiaries');
    },

    getBeneficiary: function (id) {
      return reqInstance('GET', '/beneficiaries/' + id);
    },

    createBeneficiary: function (body) {
      return reqInstance('POST', '/beneficiaries', body);
    },

    updateBeneficiary: function (id, body) {
      return reqInstance('PUT', '/beneficiaries/' + id, body);
    },

    // TRANSFERS

    createTransfer: function (body) {
      return reqInstance('POST', '/transfers', body);
    },

    getTransfer: function (transferUuid) {
      return reqInstance('GET', '/transfers/' + transferUuid);
    },

    getAllTransfers: function () {
      return reqInstance('GET', '/transfers');
    },

    getBalance: function () {
      return reqInstance('GET', '/balance');
    }

  };
};


// PRIVATE

function reqInstance (method, path, data) {
  var request = axios.create({
    baseURL: _config.RF_BASE_URL + '/v1',
    headers: {
      'client-id': _config.RF_CLIENT_ID,
      'signature': auth.createDigest(path, data, _config.RF_SECRET)
    }
  });
  switch (method) {
    case 'GET':
    case 'get':
      request = request.get(path);
      break;
    case 'PUT':
    case 'put':
      request = request.put(path, data);
      break;
    case 'POST':
    case 'post':
      request = request.post(path, data);
      break;
    case 'PATCH':
    case 'patch':
      request = request.patch(path, data);
      break;
    case 'DELETE':
    case 'delete':
      request = request.delete(path)
      break;
  }
  return request
    .then(function (resp) {
      return resp.data;
    })
    .catch(function (err) {
      return handleError(err);
    })
}

function handleError(err) {
  if (err.response && err.response.data) return err.response.data;
  if (err.message) return err.message;
  if (err.error) return err.error;
}