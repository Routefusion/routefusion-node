# Routefusion Node.js SDK

## Get Started
For API access, register for an API key at https://routefusion.co/sign_up.

Aftern signup, login and go to 'developer'. Create an API key _(CLIENT_ID) / (SECRET)_ pair.

If you plan to use the SDK set your API key / secret pair as environment variables, or create a credentials file where you can manage all of your keys in one place. The location of your credentials file should be `~/.rf/credentials` for unix systems and `C:\%USERPROFILE%\.rf\credentials` for windows systems.

_Note: API and SDK are compatible with async / await._

---
Initialize the sdk like so
```js
const routefusion = require('routefusion-sdk').init({
  cliendId: '137F1AA06E004F96BEE9B4644F8F7A46CDA45CACB0052B2583D674C530252B6C',
  secretKey: '6C075288B9E43af4e329d9999dEB180D6b5fbE6F1565939DBCabB626ae886C59',
  baseURL: 'https://sandbox.api.routefusion.co/v1'
});
```

Or, if you would like to use environment variables or a credientials file instead initialize without any arguments and setup your credentials. _This pattern is used in the rest of the docs_

```js
const routefusion = require('routefusion-sdk').init();
```

Set environment variables for the SDK to access

```bash
export RF_CLIENT_ID=137F1AA06E004F96BEE9B4644F8F7A46CDA45CACB0052B2583D674C530252B6C
export RF_SECRET_KEY=6C075288B9E43af4e329d9999dEB180D6b5fbE6F1565939DBCabB626ae886C59
```
Or, create a credentials file

```
~/.rf/credentials

[Rich] #profile name
client_id=137F1AA06E004F96BEE9B4644F8F7A46CDA45CACB0052B2583D674C530252B6C
secret_key=6C075288B9E43af4e329d9999dEB180D6b5fbE6F1565939DBCabB626ae886C59

[Paul]
client_id=25D0A96BA42FBFDF3D68A86950523B23DBF65F276D3D340DC2FA5716D7662548
secret_key=57B1144d25FEB3a8c68a9A6a803844f09d644278947dB63E211EFc43D49Ed26E
Then, set your desired profile as an environment variable
```

then export your desired profile
```bash
export RF_PROFILE=Rich
```

## Users

### Get User

```js
const routefusion = require('routefusion-sdk').init();

routefusion.getUser()
  .then(resp => resp)
  .catch(err => err)
```
response:
```json
{
    "id": 1,
    "uuid": "d48cb8b3-8945-4748-9bed-kd3d9vc15m",
    "wyre_id": null,
    "wyre_pusher_channel": null,
    "username": "",
    "first_name": "Rico",
    "last_name": "Suave",
    "occupation": "",
    "date_of_birth": "1980-03-12",
    "email": "email@email.com",
    "phone_number": "",
    "country": "US",
    "city": "Austin",
    "street": "100 Congress",
    "state": "TX",
    "zipcode": "78750",
    "verified": true,
    "admin": false,
    "type": null,
    "verification_submitted": true,
    "company_name": null,
    "created_at": "2018-08-10T22:31:55.972Z",
    "updated_at": "2018-12-09T20:56:27.258Z",
    "deleted_at": null,
    "password_reset_token": null,
    "password_reset_token_expires_at": null,
    "third_party_ids": null
}
```

### Update User

```js
const routefusion = require('routefusion-sdk').init();

let body = {
  first_name: "Bob",
  last_name: "TheBuilder",
  street: "1250 San Jacinto"
};

routefusion.updateUser(body)
  .then(resp => resp)
  .catch(err => err)
```
response:
```json
{
    "id": 1,
    "uuid": "d48cb8b3-8945-4748-9bed-kd3d9vc15m",
    "wyre_id": null,
    "wyre_pusher_channel": null,
    "username": "",
    "first_name": "Bob",
    "last_name": "TheBuilder",
    "occupation": "",
    "date_of_birth": "1980-03-12",
    "email": "email@email.com",
    "phone_number": "",
    "country": "US",
    "city": "Austin",
    "street": "1250 San Jacinto",
    "state": "TX",
    "zipcode": "78750",
    "verified": true,
    "admin": false,
    "type": null,
    "verification_submitted": true,
    "company_name": null,
    "created_at": "2018-08-10T22:31:55.972Z",
    "updated_at": "2018-12-09T20:56:27.258Z",
    "deleted_at": null,
    "password_reset_token": null,
    "password_reset_token_expires_at": null,
    "third_party_ids": null
}
```

## Beneficiaries

### Get Beneficiaries
```js
const routefusion = require('routefusion-sdk').init();

routefusion.getBenefiaries()
  .then(resp => resp)
  .catch(err => err)
```
response:
```json
[
  {
    "id": 6,
    "uuid": "b45b64de-c620-4f18-bfad-5bdefcb522c1",
    "user_id": 1,
    "company_name": "",
    "first_name_on_account": "China",
    "last_name_on_accout": "China",
    "type": "personal",
    "bank_name": "中国建设银行",
    "branch_name": "中国建设银行",
    "bank_city": "中国建设银行",
    "account_type": "personal",
    "account_number": "12345678910",
    "beneficiary_email": "china.china@china.com",
    "beneficiary_phone_number": "1231231234",
    "country": "CN",
    "city": null,
    "bank_province": "中国建设银行",
    "currency": "CNY",
    "cpfcnpj": ""
  },
  {
    ...
]
```

### Get Beneficiary

```js
const routefusion = require('routefusion-sdk').init();

let beneficiaryId = 6;

routefusion.getBenefiary(beneficiaryId)
  .then(resp => resp)
  .catch(err => err)
```

response:

```json
{
  "id": 6,
  "uuid": "b45b64de-c620-4f18-bfad-5bdefcb522c1",
  "user_id": 1,
  "company_name": "",
  "first_name_on_account": "China",
  "last_name_on_accout": "China",
  "type": "personal",
  "bank_name": "中国建设银行",
  "branch_name": "中国建设银行",
  "bank_city": "中国建设银行",
  "account_type": "personal",
  "account_number": "12345678910",
  "beneficiary_email": "china.china@china.com",
  "beneficiary_phone_number": "1231231234",
  "country": "CN",
  "city": null,
  "bank_province": "中国建设银行",
  "currency": "CNY",
  "cpfcnpj": ""
}
```

### Create Beneficiary

```js
const routefusion = require('routefusion-sdk').init();

let beneficiaryData = {
  company_name: "beneficiaryCompanyName",
  first_name_on_account: "companyOwnerFirstName",
  last_name_on_account: "companyOwnerLastName",
  type: "business",
  currency: "USD",
  bank_name: "Citibank",
  branch_name: "",
  bank_address1: "5252 Madison Ave.",
  bank_address2: "",
  bank_city: "New York City",
  bank_state_province: "New York",
  bank_postal_code: "00000",
  bank_country: "US", // 2 letter code
  bank_code: "",
  branch_code: "",
  swift_bic: "CITINY732", // 8 or 11 character code
  account_type: "business",
  account_number: "2315345432",
  routing_number: "113193532",
  clabe: "",
  tax_number: "",
  cpfcpnj: "",
  email: "company@email.com",
  phone_number: "",
  address1: "beneficiaryAddress",
  address2: "",
  city: "beneficiaryCity",
  state_province: "beneficiaryStateOrProvince",
  postal_code: "00000",
  country: "US" // 2 letter code
};

routefusion.createBenefiary(beneficiaryData)
  .then(resp => resp)
  .catch(err => err)
```
response:
```json
{
  "company_name": "beneficiaryCompany",
  "first_name_on_account": "companyOwnerFirstName",
  "last_name_on_account": "companyOwnerLastName",
  "type": "business",
  "currency": "USD",
  "bank_name": "Citibank",
  "branch_name": "",
  "bank_address1": "5252 Madison Ave.",
  "bank_address2": "",
  "bank_city": "New York City",
  "bank_state_province": "New York",
  "bank_postal_code": "00000",
  "bank_country": "US",
  "bank_code": "",
  "branch_code": "",
  "swift_bic": "CITINY732",
  "account_type": "business",
  "account_number": "2315345432",
  "routing_number": "113193532",
  "clabe": "",
  "tax_number": "",
  "cpfcpnj": "",
  "email": "company@email.com",
  "phone_number": "",
  "address1": "beneficiaryAddress",
  "address2": "",
  "city": "beneficiaryCity",
  "state_province": "beneficiaryStateOrProvince",
  "postal_code": "00000",
  "country": "US"
}
```

### Update Beneficiary

```js
const routefusion = require('routefusion-sdk').init();

let beneficiaryData = {
  address1: "newBeneficiaryAddress",
};

routefusion.updateBenefiary(beneficiaryData)
  .then(resp => resp)
  .catch(err => err)
```
response:
```json
{
  "company_name": "beneficiaryCompany",
  "first_name_on_account": "companyOwnerFirstName",
  "last_name_on_account": "companyOwnerLastName",
  "type": "business",
  "currency": "USD",
  "bank_name": "Citibank",
  "branch_name": "",
  "bank_address1": "5252 Madison Ave.",
  "bank_address2": "",
  "bank_city": "New York City",
  "bank_state_province": "New York",
  "bank_postal_code": "00000",
  "bank_country": "US",
  "bank_code": "",
  "branch_code": "",
  "swift_bic": "CITINY732",
  "account_type": "business",
  "account_number": "2315345432",
  "routing_number": "113193532",
  "clabe": "",
  "tax_number": "",
  "cpfcpnj": "",
  "email": "company@email.com",
  "phone_number": "",
  "address1": "newBeneficiaryAddress",
  "address2": "",
  "city": "beneficiaryCity",
  "state_province": "beneficiaryStateOrProvince",
  "postal_code": "00000",
  "country": "US"
}
```

## Transfers

### Create Transfer
```js
const routefusion = require('routefusion-sdk').init();

let transferData = {
  beneficiary_id: 6,
  source_amount: 10000
};

routefusion.createTransfer(transferData)
  .then(resp => resp)
  .catch(err => err)
```

### Get Transfer
```js
const routefusion = require('routefusion-sdk').init();

let transferUuid = '1c511f62-f8b1-4070-a27a-c1581e7fg79a';

routefusion.createTransfer(transferUuid)
  .then(resp => resp)
  .catch(err => err)
```

response:
```json
{
    "state": "processing",
    "created_at": "2018-12-03T20:35:31.017Z"
}
```
