const crypto = require('crypto');

exports.createDigest = function (path, data, secret) {
  // check data is not null or array and is valid object
  if (data) {
    data = JSON.stringify(data);
  } else {
    // if data === path, add '/v1' to string
    data = '/v1' + path;
  }

  let signature = crypto.createHmac('sha512', secret);
  signature = signature.update(data);
  return signature.digest('base64');
}
