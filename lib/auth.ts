import * as crypto from 'crypto';

export function createDigest(path: string, data: string | object | undefined, secret: string) {
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
