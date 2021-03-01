# @practera/messaging-sdk

Facilitates the communication with the Practera messaging API.

## Health

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=intersective_messaging-sdk&metric=alert_status&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_messaging-sdk)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=intersective_messaging-sdk&metric=coverage&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_messaging-sdk)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=intersective_messaging-sdk&metric=security_rating&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_messaging-sdk)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=intersective_messaging-sdk&metric=sqale_rating&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_messaging-sdk)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=intersective_messaging-sdk&metric=bugs&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_messaging-sdk)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=intersective_messaging-sdk&metric=code_smells&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_messaging-sdk)


## Install

```
$ npm install @practera/messaging-sdk
```

## Usage

### setting up the client
JavaScript:
```js
const Messages = require("@practera/messaging-sdk");
```

TypeScript:
```js
import { Messages } from "@practera/messaging-sdk";
```

Sending a json to the messaging service

```js
const client = new Messages.create(
  privateKey, // the private key used to sign the request
  service, // this will identify what public key to use to validate the token, the variable called ${service}_JWT will be used. The variable should contain a key called public and the public key as the value.
  url, // the URL of the messaging API, leave empty for production
);

// to perform the api call for the data
client.send({message: 'Hello world !!!'});

// a singleton has been created so after creating the initial client you can also call it using
Messages.instance.send({wow: "blah"});
```
