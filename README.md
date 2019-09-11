# Routefusion Node.js SDK

## Contents
- [Get Started](#get_started)
- [Users](#Users)
- [Beneficiaries](#Beneficiaries)
- [Transfers](#Transfers)
- [Balance](#Balance)

<a name="get_started"></a>
## Get Started
For API access, register for an API key at https://routefusion.co/sign_up.

Aftern signup, login and go to 'developer'. Create an API key _(CLIENT_ID) / (SECRET)_ pair.

If you plan to use the SDK set your API key / secret pair as environment variables, or create a credentials file where you can manage all of your keys in one place. The location of your credentials file should be `~/.rf/credentials` for unix systems and `C:\%USERPROFILE%\.rf\credentials` for windows systems.

_Note: API and SDK are compatible with async / await._

---
Initialize an instance of the sdk like so
```js
const rf = require('routefusion-sdk').Instance({
  RF_CLIENT_ID: '137F1AA06E004F96BEE9B4644F8F7A46CDA45CACB0052B2583D674C530252B6C',
  RF_SECRET: '6C075288B9E43af4e329d9999dEB180D6b5fbE6F1565939DBCabB626ae886C59',
  RF_BASE_URL: 'https://sandbox.api.routefusion.co' // will default to sandbox
});
```

Or, if you would like to use environment variables or a credientials file instead initialize without any arguments and setup your credentials. _This pattern is used in the rest of the docs_

```js
const rf = require('routefusion-sdk').Instance();
```

Set environment variables for the SDK to access

```bash
export RF_CLIENT_ID=137F1AA06E004F96BEE9B4644F8F7A46CDA45CACB0052B2583D674C530252B6C
export RF_SECRET=6C075288B9E43af4e329d9999dEB180D6b5fbE6F1565939DBCabB626ae886C59
export RF_BASE_URL='https://sandbox.api.routefusion.co' # will default to sandbox
```
Or, create a credentials file

```
~/.rf/credentials

[Rich] #profile name
client_id=137F1AA06E004F96BEE9B4644F8F7A46CDA45CACB0052B2583D674C530252B6C
secret=6C075288B9E43af4e329d9999dEB180D6b5fbE6F1565939DBCabB626ae886C59
base_url=https://sandbox.api.routefusion.co  # will default to sandbox

[Paul]
client_id=25D0A96BA42FBFDF3D68A86950523B23DBF65F276D3D340DC2FA5716D7662548
secret=57B1144d25FEB3a8c68a9A6a803844f09d644278947dB63E211EFc43D49Ed26E
Then, set your desired profile as an environment variable
```

then export your desired profile
```bash
export RF_PROFILE=Rich
```
_Note: The credentials lookup priority is Instance config, environment variables, then credentials file_

## Users

### Get User

```js
const rf = require('routefusion-sdk').Instance();

rf.getUser()
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
const rf = require('routefusion-sdk').Instance();

let body = {
  first_name: "Bob",
  last_name: "TheBuilder",
  street: "1250 San Jacinto"
};

rf.updateUser(body)
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
const rf = require('routefusion-sdk').Instance();

rf.getBenefiaries()
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
const rf = require('routefusion-sdk').Instance();

let beneficiaryId = 6;

rf.getBenefiary(beneficiaryId)
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
const rf = require('routefusion-sdk').Instance();

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

rf.createBenefiary(beneficiaryData)
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
const rf = require('routefusion-sdk').Instance();

let beneficiaryData = {
  address1: "newBeneficiaryAddress",
};

rf.updateBenefiary(beneficiaryData)
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
const rf = require('routefusion-sdk').Instance();

let transferData = {
  beneficiary_id: 6,
  source_amount: 1000
};

rf.createTransfer(transferData)
  .then(resp => resp)
  .catch(err => err)
```

response:
```json
{
    "id": 120,
    "user_id": 1,
    "account_id": null,
    "beneficiary_id": 6,
    "source_amount": "1000",
    "exchange_rate": null,
    "fee": null,
    "currency_pairs": "USDUSD",
    "created_at": "2018-12-14T00:41:38.661Z",
    "updated_at": null,
    "uuid": "b1e3f2fa-27f1-4424-987c-105009fed4fe",
    "state": "created",
    "payout_partner_uuid": null,
    "authorizing_ip": "::1",
    "transfer_states": [
        {
            "state": "created",
            "created_at": "2018-12-14T00:41:38.643Z"
        }
    ],
    "source_currency": "USD",
    "destination_amount": null,
    "destination_currency": "USD",
    "payout_partner_fee": null,
    "payout_partner": null,
    "payout_partner_status": null
}
```

### Get Transfer
```js
const rf = require('routefusion-sdk').Instance();

let transferUuid = '1c511f62-f8b1-4070-a27a-c1581e7fg79a';

rf.createTransfer(transferUuid)
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

## Balance

### Get Balance
```js
const rf = require('routefusion-sdk').Instance();

rf.getBalance()
  .then(resp => resp)
  .catch(err => err)
```

response

```json
{
    "balance": 200
}
```

## Verify

### Send Verification Data
```js
const rf = require('routefusion-sdk').Instance();

let userUuid = 'a1d40a18-723d-45fe-b362-10a94d5072bf';

let verificationData = {
  agreedToTerms: true,
  allowAccountManagement: true,
  address: "600 Congress Ave.",
  city: "Austin",
  companyName: "Routefusion",
  country: "US",
  dateOfIncorporation: "2009-04-07",
  dba: true,
  dbaName: "Some Cool Name",
  incorporationNumber: "29-1234567",
  officers: [
    {
      address: "777 Lucky St.",
      citizenship: "US",
      city: "Palmer",
      dob: "1978-06-22",
      firstName: "John",
      idNumber: "123456789",
      idType: "ssn",
      jobTitle: "Director of Sales",
      lastName: "Doe",
      owner: true,
      ownership: "50",
      postalCode: "78949",
      state: "TX",
      title: "Mr."
    }
  ],
  owners: [
    {
      address: "900 Test Dr.",
      citizenship: "US",
      city: "Goergetown",
      dob: "1981-03-23",
      firstName: "Jason",
      idNumber: "987654321",
      idType: "ssn",
      jobTitle: "Technical Director",
      lastName: "Stathom",
      owner: true,
      ownership: "50",
      postalCode: "75765",
      state: "TX",
      title: "Mr."
    }
  ],
  payments: {
    countries: [
      "IT",
      "MX",
      "AU"
    ],
    frequency: "monthly",
    purpose: "Contract Labor",
    volume: "100000"
  },
  phone: "88881355888",
  postalCode: "75745",
  state: "TX",
  structure: "llc",
  website: "www.testCompany.com"
};

rf.sendVerificationData(verificationData, userUuid)
  .then(resp => resp)
  .catch(err => err);
```

response

```json
{ 
  "message": "Success"
}
```

### Get Verification Data
```js
const rf = require('routefusion-sdk').Instance();

let userUuid = 'a1d40a18-723d-45fe-b362-10a94d5072bf';

rf.getVerificationData(userUuid)
  .then(resp => resp)
  .catch(err => err);
```

response

```json
{
  "owners": [
    {
      "address": "900 Test Dr.",
      "citizenship": "US",
      "city": "Goergetown",
      "dob": "1981-03-23",
      "firstName": "Jason",
      "idNumber": "987654321",
      "idType": "ssn",
      "jobTitle": "Technical Director",
      "lastName": "Stathom",
      "owner": true,
      "ownership": "50",
      "postalCode": "75765",
      "state": "TX",
      "title": "Mr."
    }
  ],
  "dbaName": "Some Cool Name",
  "dateOfIncorporation": "2009-04-07",
  "phone": "88881355888",
  "companyName": "Routefusion",
  "allowAccountManagement": true,
  "dba": true,
  "agreedToTerms": true,
  "address": "600 Congress Ave",
  "postalCode": "75745",
  "incorporationNumber": "29-1234567",
  "state": "TX",
  "structure": "llc",
  "officers": [
    {
      "address": "777 Lucky St.",
      "citizenship": "US",
      "city": "Palmer",
      "dob": "1978-06-22",
      "firstName": "John",
      "idNumber": "123456789",
      "idType": "ssn",
      "jobTitle": "Director of Sales",
      "lastName": "Doe",
      "owner": true,
      "ownership": "50",
      "postalCode": "78949",
      "state": "TX",
      "title": "Mr."
    }
  ],
  "payments": {
    "volume": "100000",
    "frequency": "monthly",
    "countries": [
      "IT",
      "MX",
      "AU"
    ],
    "purpose": "Contract Labor"
  },
  "website": "www.testCompany.com",
  "city": "Austin",
  "country": "US"
}
```

### Update Verification Data
```js
const rf = require('routefusion-sdk').Instance();

let userUuid = 'a1d40a18-723d-45fe-b362-10a94d5072bf';

let verificationData = {
  agreedToTerms: true,
  allowAccountManagement: true,
  address: "1234 Updated Address",
  city: "Austin",
  companyName: "Routefusion",
  country: "US",
  dateOfIncorporation: "2009-04-07",
  dba: true,
  dbaName: "Updated Cool Name",
  incorporationNumber: "29-1234567",
  officers: [
    {
      address: "777 Lucky St.",
      citizenship: "US",
      city: "Palmer",
      dob: "1978-06-22",
      firstName: "John",
      idNumber: "123456789",
      idType: "ssn",
      jobTitle: "Director of Sales",
      lastName: "Doe",
      owner: true,
      ownership: "50",
      postalCode: "78949",
      state: "TX",
      title: "Mr."
    }
  ],
  owners: [
    {
      address: "900 Test Dr.",
      citizenship: "US",
      city: "Goergetown",
      dob: "1981-03-23",
      firstName: "Jason",
      idNumber: "987654321",
      idType: "ssn",
      jobTitle: "Technical Director",
      lastName: "Stathom",
      owner: true,
      ownership: "50",
      postalCode: "75765",
      state: "TX",
      title: "Mr."
    }
  ],
  payments: {
    countries: [
      "IT",
      "MX",
      "AU"
    ],
    frequency: "monthly",
    purpose: "Contract Labor",
    volume: "100000"
  },
  phone: "88881355888",
  postalCode: "75745",
  state: "TX",
  structure: "llc",
  website: "www.testCompany.com"
};

rf.updateVerificationData(verificationData, userUuid)
  .then(resp => resp)
  .catch(err => err);
```

response

```json
{ 
  "message": "Success"
}
```

### Delete Verification Data
```js
const rf = require('routefusion-sdk').Instance();

let userUuid = 'a1d40a18-723d-45fe-b362-10a94d5072bf';

rf.deleteVerificationData(userUuid)
  .then(resp => resp)
  .catch(err => err);
```

response

```json
{
  "message": "Success"
}
```