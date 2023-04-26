module.exports = {
  development: {
    username: "root",
    password: "password",
    database: "bookstore",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: "root",
    password: "password",
    database: "bookstore",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
