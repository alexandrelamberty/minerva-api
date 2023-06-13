require("dotenv").config();
require("express-async-errors");
const winston = require("winston");
const express = require("express");
const cors = require("cors");

/**
 * Application logging
 */
const logger = winston.createLogger({
  // Log only if level is less than (meaning more severe) or equal to this
  level: "info",
  // Use timestamp and printf to create a standard log format
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  // Log to the console and a file
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

/**
 * Application database
 */
const db = require("./models");
db.sequelize
  .authenticate()
  .then(() => console.log("Connection DB successful"))
  .catch((err) => console.log("Connection DB failed : ", err));

if (process.env.NODE_ENV === "development") {
  // db.sequelize.sync({ alter: true });
  // db.sequelize.sync({ alter: { drop: true } });
  // db.sequelize.sync({ force: true });
} else {
  db.sequelize.sync({ force: false });
}

/**
 * Application
 */
const app = express();

app.use(
  cors({
    origin: [
      "https://minerva.eevos.be",
      "https://minerva.netlify.app/",
      "http://localhost:4200",
      "http://localhost:5173",
      "http://localhost",
    ],
  })
);
app.use(express.json());
app.use(express.static("public"));

// Logging middleware
app.use((req, res, next) => {
  // Log an info message for each incoming request
  logger.info(`Received a ${req.method} request for ${req.url}`);
  next();
});

// Initialize routing
const router = require("./routes");
app.use("/", router);

// Starting the application
app.listen(process.env.API_PORT, () => {
  console.log(`Server API started on port:${process.env.API_PORT}`);
});
