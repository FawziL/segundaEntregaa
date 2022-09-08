const winston = require("winston");
require("dotenv").config()

const buildProdLogger = () => {
  const prodLogger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: "warn.log", level: "warn" }),
      new winston.transports.File({ filename: "error.log", level: "error" }),
    ],
  });

  return prodLogger;
};

const buildDevLogger = () => {
  const devLogger = winston.createLogger({
    transports: [new winston.transports.Console({ level: "info" })],
  });

  return devLogger;
};

let logger;

if (process.env.NODE_ENV.toLocaleUpperCase() === "PROD") {
  logger = buildProdLogger();
} else {
  logger = buildDevLogger();
}

module.exports = logger;