# Readme Backend

Before any setup:

```bash
cd backend
```

## DATABASE SETUP

### INSTALL Package

install necessary packages :

```bash
npm i
```

### CREATE .env files

We need 3 .env files for the 3 databases :

`.env.development  
.env.production  
.env.test`

in the server folder

in .env.development :

DATABASE_URL=<YOUR_DB_URL_CONNECTION>/travel-app-dev

in .env.production :

DATABASE_URL=<YOUR_DB_URL_CONNECTION>/travel-app-prod

in .env.test :

DATABASE_URL=<YOUR_DB_URL_CONNECTION>/travel-app-test

### RUN the scripts

multiple scripts exist:

npm run seed : will create and seed the dev database
npm run seed-prod: will create and seed the prod database

(no script for test database as it will be created at the launch of tests)

## SERVER SETUP

### INSTALL Packages

if not done for db install necessary packages :

```bash
npm i
```

### Build

need to create a build before starting the server:

```bash
npm run build
```

### Run the server

if the build is successfull:

```bash
npm run dev
```
