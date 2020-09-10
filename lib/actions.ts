import axios from 'axios';
import auth from './auth';
import config from './config';

let _config;

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'OPTIONS' | 'DELETE';
export type RequestData = 'object';

export default function (config) {
  // set global config
  _config = config || {};

  return {
    // USERS
    getUser: function () {
      return reqInstance('GET', '/users/me')
    },

    updateUser: function (body) {
      return reqInstanceWithBody('PUT', '/users/me', body);
    },

    // MASTER USERS
    getUserByUuid: function (uuid) {
      return reqInstance('GET', '/users/me/users/' + uuid)
    },

    getUsers: function (uuid) {
      return reqInstance('GET', '/users/me/users/')
    },

    updateUserByUuid: function (uuid, body) {
      return reqInstanceWithBody('PUT', '/users/me/users/' + uuid, body)
    },

    createUserByUuid: function (body) {
      return reqInstanceWithBody('POST', '/users/me/users/', body)
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

    getTransferStatus: function (transferUuid) {
      return reqInstance('GET', '/transfers/' + transferUuid + '/status')
    },

    cancelTransfer: function (transferUuid) {
      return reqInstance('DELETE', '/transfers/' + transferUuid + '/cancel');
    },

    cancelTransferForUser: function (userUuid, transferUuid) {
      return reqInstance('DELETE', '/users/' + userUuid + '/transfers/' + transferUuid + '/cancel');
    },

    getBalance: function () {
      return reqInstance('GET', '/balance');
    },

    // QUOTES

    createQuote: function (body) {
      return reqInstance('POST', '/quotes', body);
    },

    // VERIFY

    sendVerificationData: function (body, userUuid) {
      return reqInstance('POST', '/users/' + userUuid + '/verify', body);
    },

    getVerificationData: function (userUuid) {
      return reqInstance('GET', '/users/' + userUuid + '/verify');
    },

    updateVerificationData: function (body, userUuid) {
      return reqInstanceWithBody('PUT', '/users/' + userUuid + '/verify', body);
    },

    deleteVerificationData: function (userUuid) {
      return reqInstance('DELETE', '/users/' + userUuid + '/verify');
    },

    // Webhooks
    createWebhook: function (body) {
      return reqInstance('POST', '/webhooks', body);
    },

    updateWebhook: function (uuid, body) {
      return reqInstance('PUT', '/webhooks/' + uuid, body);
    },

    getWebhook: function (uuid) {
      return reqInstance('GET', '/webhooks/' + uuid);
    },

    getWebhooks: function () {
      return reqInstance('GET', '/webhooks');
    },

    deleteWebhooks: function (uuid) {
      return reqInstance('DELETE', '/webhooks/' + uuid);
    },
  };
};


// PRIVATE

function reqInstance(method: HttpMethod, path: string, data?: RequestData) {
  let request = axios.create({
    baseURL: _config.RF_BASE_URL + '/v1',
    headers: {
      'client-id': _config.RF_CLIENT_ID,
      'signature': auth.createDigest(path, data, _config.RF_SECRET)
    }
  });
  switch (method) {
    case 'GET':
      request = request.get(path);
      break;
    case 'PUT':
      request = request.put(path, data);
      break;
    case 'POST':
      request = request.post(path, data);
      break;
    case 'PATCH':
      request = request.patch(path, data);
      break;
    case 'DELETE':
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

function reqInstanceWithBody(method: HttpMethod, path: string, data?: RequestData) {
  // check data is not null, not an array, is a valid object
  if (data !== null && !(data instanceof Array) && typeof data !== 'object') {
    return Promise.reject(function () {
      throw Error('body must be an object');
    });
  }
  return reqInstance(method, path, data);
}

function handleError(err) {
  if (err.response && err.response.data) return err.response.data;
  if (err.message) return err.message;
  if (err.error) return err.error;
}
