# Honesto - Citrus Byte Code Test

Repository for [http://honesto-test.herokuapp.com](http://honesto-test.herokuapp.com)

This project is a code test for Citrusbyte. The app is built with Typescript, React, Webpack and Origami as an API platform.

## Requirements
- Node.js
- Yarn
- A Mongo database

## Installation & Setup
### Libraries
This project is built with Node.js and Yarn
```sh
yarn
```

### Database
A mongo database is necessary for this app to run.
Once you have the credentials, edit the `.origami` file:

```json
{
  ...
  "store": {
      "type": "mongodb",
      "host": "localhost",
      "port": 27017,
      "database": "YOUR-DATABASE",
      "username": "LOCAL-DB-USER",
      "password": "LOCAL-DB-PASSWORD"
  }
  ...
```
}

**Alternatively**, you can create a `.env` file that will override the `.origami` file settings:

#### .env file (DON'T COMMIT)
```do
origami_store_type="mongodb"
origami_store_host="localhost"
origami_store_port=27017
origami_store_database="YOUR-DATABASE"
origami_store_username="LOCAL-DB-USER"
origami_store_password="LOCAL-DB-PASSWORD"
```

### Social Login
For the login oauth to work, the Client ID and Client Secret will need to be configured:

#### .env file (DON'T COMMIT)
```do
...
origami_plugins_social-login_google_clientID="YOUR-GOOGLE-CLIENT-ID"
origami_plugins_social-login_google_clientSecret="YOUR-GOOGLE-CLIENT-SECRET"
```


## Developing
All client app files are located under `src/app/`. The development server with file watching can be run with

```sh
yarn dev
```


## Building
A production build can be created by running
```
yarn build
```
