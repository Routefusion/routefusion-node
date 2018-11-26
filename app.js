const crypto = require('crypto');
const SECRET_KEY = 'FB68D8EB8eE215333d547Ac887dba14E64Cdb7de3928765304a1835771Ee3Fc1';

const BODY = JSON.stringify({
  test: 'hooray!'
})

let digest = crypto.createHmac('sha512', SECRET_KEY);

digest.update(BODY);

console.log(digest.digest('base64'))

let Routefusion = (key, secret) => {
  key = key;
  secret = secret;
}

Routefusion.prototype.authenticate = () => {

}

module.exports = {
  Routefusion
}
