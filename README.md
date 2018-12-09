# Routefusion Node.js SDK

### Get Started
For API access, register for an API key at https://routefusion.co/sign_up.

Aftern signup, login and go to 'developer'. Create an API key _(CLIENT_ID) / (SECRET)_ pair.

If you plan to use the SDK set your API key / secret pair as environment variables, or create a credentials file where you can manage all of your keys in one place. The location of your credentials file should be `~/.rf/credentials` for unix systems and `C:\%USERPROFILE%\.rf\credentials` for windows systems.

_Note: API and SDK are compatible with async / await._

---

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

then `export RF_PROFILE=Rich`