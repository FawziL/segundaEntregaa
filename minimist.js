const parseArgs = require("minimist");

const options = {
  alias: {
    p: "puerto",
  },
  default: {
    puerto: 8080,
  },
};

const args = parseArgs(process.argv.slice(2), options);

console.log(args.puerto);

const port= args.puerto

module.exports = port;