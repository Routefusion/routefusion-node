# Routefusion Node.js SDK
Please see the [wiki](https://github.com/Routefusion/routefusion-node/wiki) for more detailed information about Routefusion's primary concepts.

## Contents
- [Get Started](#get_started)
- [Users](#Users)
- [Beneficiaries](#Beneficiaries)
- [Transfers](#Transfers)
- [Balance](#Balance)
- [Verify](#Verify)

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

### Create User account

```js
const rf = require('routefusion-sdk').Instance();

let body = {
  name_on_account: 'Bob TheBuilder',
  account_number: '123',
  routing_number: '1234',
  currency: 'USD',
  bank_country: 'US'
};

rf.createUserAccount(body)
  .then(resp => resp)
  .catch(err => err)
```
response:
```json
{
    "uuid": "d48cb8b3-8945-4748-9bed-kd3d9vc15m"
}
```

### Get User accounts

```js
const rf = require('routefusion-sdk').Instance();

// This only returns one account
rf.getUserAccounts(userUuid)
  .then(resp => resp)
  .catch(err => err)
```
response:
```json
[{
    "id": 6,
    "uuid": "b45b64de-c620-4f18-bfad-5bdefcb522c1",
    "user_id": 1,
    "company_name": "",
    "account_number": "123",
    "routing_number": "123",
    "bank_name": "Citibank",
    "bank_address": "5252 Madison Ave.",
    "default_currency": "USD",
    "created_at": "2018-12-14T00:41:38.661Z",
    "name_on_account": "bob theBuilder",
    "currency": "1231231234",
    "primary_account": true,
    "bank_country": "us"
}]
```

### Get User accounts byUuid

```js
const rf = require('routefusion-sdk').Instance();

rf.getUserAccountByUuid(userUuid, accountUuid)
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
    "account_number": "123",
    "routing_number": "123",
    "bank_name": "Citibank",
    "bank_address": "5252 Madison Ave.",
    "default_currency": "USD",
    "created_at": "2018-12-14T00:41:38.661Z",
    "name_on_account": "bob theBuilder",
    "currency": "1231231234",
    "primary_account": true,
    "bank_country": "us"
}
```

## Banks

### Find a bank

```javascript
const rf = require('routefusion-sdk').Instance();

const findByIBAN = {
  iban: 'GB29NWBK60161331926819'
};

rf.findBank(findByIBAN)
```
response:
```json
{
  "bank_name": "NATIONAL WESTMINSTER BANK PLC",
  "branch_name": "NATIONAL WESTMINSTER BANK PLC",
  "bank_address1": "PREMIER PLACE, DEVONSHIRE SQUARE",
  "bank_address2": null,
  "bank_city": "LONDON",
  "bank_state_province": null,
  "bank_country": "GB",
  "bank_postal_code": "EC2M 4XB",
  "swift_bic": "NWBKGB2LXXX",
  "bank_code": null,
  "branch_code": "601613"
}
```

## Batches

### Get Transfer Batch
```js
const rf = require('routefusion-sdk').Instance();
const uuid = "BA-c96f27dd-50d2-4cf9-be30-5006bf6fa94b";

rf.getTransferBatch(uuid)
  .then(resp => resp)
  .catch(err => err)
```
response:
```json
{
    "uuid": "BA-c96f27dd-50d2-4cf9-be30-5006bf6fa94b",
    "status": "created",
    "transfers": [
        {
            "source_currency": null,
            "source_amount": "1000.00",
            "destination_amount": null,
            "beneficiary_uuid": "b45b64de-c620-4f18-bfad-5bdefcb522c1"
        },
        {
            "source_currency": null,
            "source_amount": "250.00",
            "destination_amount": null,
            "beneficiary_uuid": "27bdb938-3d45-4b64-bf39-1eb7602c8cd4"
        }
    ]
}
```

### Create Transfer Batch
```js
const rf = require('routefusion-sdk').Instance();

const batch = {
  transfers: [
    {
      source_amount: 1000,
      beneficiary_uuid: "b45b64de-c620-4f18-bfad-5bdefcb522c1"
    },
    {
      source_amount: 250,
      beneficiary_uuid: "27bdb938-3d45-4b64-bf39-1eb7602c8cd4"
    }
  ]
}

rf.createTransferBatch(batch)
  .then(resp => resp)
  .catch(err => err)
```
response:
```json
{
    "uuid": "BA-c96f27dd-50d2-4cf9-be30-5006bf6fa94b",
    "status": "created",
    "transfers": [
        {
            "source_amount": "1000.00",
            "beneficiary_uuid": "b45b64de-c620-4f18-bfad-5bdefcb522c1"
        },
        {
            "source_amount": "250.00",
            "beneficiary_uuid": "27bdb938-3d45-4b64-bf39-1eb7602c8cd4"
        }
    ]
}
```
### Create Quote Batch
```js
const rf = require('routefusion-sdk').Instance();

const transferBatchId = "BA-c96f27dd-50d2-4cf9-be30-5006bf6fa94b";

rf.createQuoteBatch(transferBatchId);
```
response:
*note the uuid here is the Quote Batch uuid*
```json
{
    "uuid": "cfdc73e6-92cb-493a-8a76-f9b9f84f1bb9",
    "quotes": [
        {
            "quote_uuid": "QU12bf9abb-da29-47dc-abb6-84b66bdf2545",
            "source_currency": "SGD",
            "destination_currency": "HKD",
            "rate": "5.7445",
            "inverted_rate": "0.17407955435634084",
            "fee": "3.00",
            "payment_method": "local"
        },
        {
            "quote_uuid": "QUd8b6daba-9cda-4359-acae-932818ccccc0",
            "source_currency": "SGD",
            "destination_currency": "USD",
            "rate": "0.7326",
            "inverted_rate": "1.365001365001365",
            "fee": "3.00",
            "payment_method": "local"
        }
    ],
    "expires_at": "2020-09-10T16:39:41.186Z"
}
```
### Process Transfer Batch
```js
const rf = require('routefusion-sdk').Instance();
const uuid = "BA-c96f27dd-50d2-4cf9-be30-5006bf6fa94b";

rf.processTransferBatch(uuid)
  .then(resp => resp)
  .catch(err => err)
```
response:
```json
{
    "uuid": "BA-c96f27dd-50d2-4cf9-be30-5006bf6fa94b",
    "status": "processing",
    "transfers": [
        {
            "source_currency": null,
            "source_amount": "1000.00",
            "destination_amount": null,
            "beneficiary_uuid": "b45b64de-c620-4f18-bfad-5bdefcb522c1"
        },
        {
            "source_currency": null,
            "source_amount": "250.00",
            "destination_amount": null,
            "beneficiary_uuid": "27bdb938-3d45-4b64-bf39-1eb7602c8cd4"
        }
    ]
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

### Cancel Transfer
```js
const rf = require('routefusion-sdk').Instance();

let transferUuid = '1c511f62-f8b1-4070-a27a-c1581e7fg79a';

rf.cancelTransfer(transferUuid)
  .then(resp => resp)
  .catch(err => err)
```

response:
```json
{
    "message": "transfer 1c511f62-f8b1-4070-a27a-c1581e7fg79a cancelled"
}
```

### Cancel Transfer on behalf of User
```js
const rf = require('routefusion-sdk').Instance();

let transferUuid = '1c511f62-f8b1-4070-a27a-c1581e7fg79a';
let userUuid = 'd48cb8b3-8945-4748-9bed-kd3d9vc15m';

rf.cancelTransferForUser(userUuid, transferUuid)
  .then(resp => resp)
  .catch(err => err)
```

response:
```json
{
    "message": "transfer 1c511f62-f8b1-4070-a27a-c1581e7fg79a cancelled"
}
```

## Rates

### Get Rate
```js
const rf = require('routefusion-sdk').Instance();

const body = {
  source_currency: "USD",
  destination_currency: "MXN"
}

rf.getRate(body)
  .then(resp => resp)
  .catch(err => err)
```

response

```json
{
    "source_currency": "USD",
    "destination_currency": "MXN",
    "rate": 1.24
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

## Wallets
```js
const rf = require('routefusion-sdk').Instance();

rf.getWalletBalances()
  .then(resp => resp)
  .catch(err => err);
```

response

```json
{
  "usd": {
    "liquidity_provider_account": 100
  }
}
```

