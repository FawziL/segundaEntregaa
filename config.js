require("dotenv").config()
const parseArgs = require("minimist");

const options = {
  alias: {
    p: "puerto",
  },
  default: {
    puerto: 8080,
  },
};

const args = parseArgs(process.argv.slice(3), options);
const modo = parseArgs(process.argv.slice(2));
console.log(args.puerto);


module.exports = {
  mongodb: process.env.MONGO_URL
  ,
  session: {
      SECRET: process.env.SECRET
  },
  port: args.puerto ?? '8080',
  modo: modo.modo,
}