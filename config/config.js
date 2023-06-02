module.exports = {
  development: {
    username: "root",
    password: "minerva",
    database: "minerva",
    host: "172.20.0.2",
    port: 3306,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: "minerva",
    password: "minerva",
    database: "minerva",
    host: "localhost",
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
