const isValidPair = require("./utility").isValidPair;

const isValidCommand = function(option) {
  return option === "--save" || option === "--query";
};

const isOptionsOfSave = function(valToRetrun) {
  return (
    valToRetrun.command === "--save" &&
    valToRetrun.options.hasOwnProperty("--empId") &&
    valToRetrun.options.hasOwnProperty("--qty") &&
    valToRetrun.options.hasOwnProperty("--beverage")
  );
};

const isOptionsOfQuery = function(valToRetrun) {
  return (
    valToRetrun.command === "--query" &&
    (valToRetrun.options.hasOwnProperty("--empId") ||
      valToRetrun.options.hasOwnProperty("--date") ||
      valToRetrun.options.hasOwnProperty("--beverage"))
  );
};

const findOptions = function(args) {
  let options = {};
  for (let index = 1; index < args.length; index += 2) {
    if (!isValidPair(args[index], args[index + 1])) {
      return false;
    }
    options[args[index]] = args[index + 1];
  }
  return (
    (isOptionsOfSave({ command: args[0], options }) ||
      isOptionsOfQuery({ command: args[0], options })) && {
      command: args[0],
      options
    }
  );
};

const parseValidOptions = function(cmdArgs) {
  return isValidCommand(cmdArgs[0]) && findOptions(cmdArgs);
};

exports.parseValidOptions = parseValidOptions;
