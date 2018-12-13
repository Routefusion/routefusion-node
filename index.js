var axios = require('axios');
var auth = require('./lib/auth');
var config = require('./lib/config');

function client(localConfig) {
  localConfig = localConfig || {};
  // for scope
  var _config = Object.assign(localConfig, config);

  // for GET requests, data === path
  // for POST requests, data === body
  function reqInstance (method, path, data) {
    var request = axios.create({
      baseURL: _config.RF_BASE_URL,
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
        return err.response.data;
      })
  }

  // function errorhandler(err) {
  //   var type = ['response', 'message', 'error'];

  //   Object.keys(err).forEach(e => {
  //     if (type.includes(e)) {
  //       if (e === 'response') {
  //         console.log(err[e].data);
  //         return err[e].data;
  //       }

  //       console.log(err[e]);
  //       return err[e];
  //     }
  //   })
  // }

  return {

    setConfig: function (config) {
      _config = Object.assign(_config, config || {});
    },

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
      return reqInstance('PUT', '/beneficiaries', body);
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
    }
  };
};

module.exports = client();

module.exports.Instance = function(localConfig) {
  localConfig = config || {};
  return client(localConfig);
};