# Finance-API

A API for financial control systems

### Requirements

- [Nodejs](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [TypeORM](https://www.typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)

### Start Server

- Clone the repository:

```
$ git clone https://github.com/jucelinodev/finance-api.git
```

- Enter directory

```
$ cd /finance-api
```

- To install all dependencies, you must run the following command:

```
$ npm install
```

- Change ormconfig.json.example to ormconfig.json and enter valid data for database connection and other settings:

```

# Database
{
  "type": "your plugin from your database",
  "host": "your host",
  "username": "your database port",
  "password": "your database password",
  "database": "your database name",
  "entities": [
    "./src/entity/*.ts"
  ],
  "migrations": [
    "./src/database/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}

```

- Run migrations:

```
$ npm run typeorm migration:run
```

- Start server:

```
$ npm run dev
```
