var crypto = require('crypto');


// for GET requests, data === path {String}
// for POST requests, data === body {Object}
exports.createDigest = function (path, data, secret) {
  // check data is not null or array and is valid object
  if (data) {
    data = JSON.stringify(data);
  } else {
    // if data === path, add '/v1' to string
    data = '/v1' + path;
  }

  var signature = crypto.createHmac('sha512', secret);
  signature = signature.update(data);
  return signature.digest('base64');
}