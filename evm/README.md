# EVM

```bash
npm install
npm run build
npm run start
```

Contract on Optimism Goerli:

https://goerli-optimism.etherscan.io/address/0xacae5e972fbbec5cc761a5f75705ba041ac870be#code

## Try it

### Faulty proof

{
    "claimInfo": {
      "provider": "google-login",
      "parameters": "{\"emailAddress\":\"mail@gmail.com\"}",
      "context": "{\"contextAddress\":\"0x0\",\"contextMessage\":\"0x9c1aa92781dcf4661f8abff2ea9404df23c86a42f6649fca4c2390d95bf77b2d\",\"sessionId\":\"4bf1845e-31b8-4971-86e3-60e5dd07700a\"}"
    },
    "signedClaim": {
      "claim": {
        "identifier": "0xe13738b819aaee0943e248e8d7dd4d53c0b38dca193e82db69dfd50e9cb9d159",
        "owner": "0x1fAD00824665696b048ac933641761c20232b483",
        "epoch": 2,
        "timestampS": "1696234509"
      },
      "signatures": [
        "0x9a7b74d872f1d4293d554a5764dc72f6c010abbcbe228f52760e02316136512065907645288734e347e6531a04df48439d04aaedf57fe922d555b3ea5306c5f51c"
      ]
    }
  }


### Valid proof
{
    "claimInfo": {
      "context": "",
      "parameters": "{\"uid\":\"673906874713\"}",
      "provider": "uidai-uid"
    },
    "signedClaim": {
      "claim": {
        "epoch": 2,
        "identifier": "0xafb5c7415e79bbf42b122d3c0d02d7b8da9deb04df933b95318b57483d587ae3",
        "owner": "0xdFb1dCADeeEC3273Fb2C50563312D1d5f7347615",
        "timestampS": "1697188555"
      },
      "signatures": [
        "0x17a4133c87ebe482a33607486b5014b9cc92890cdd862db405dbcaf1b96112f829a87d411d8fd25fcd408c021e87e345457d251f8b8afdb13476ca89b8aa80c31b"
      ]
    }
  }

