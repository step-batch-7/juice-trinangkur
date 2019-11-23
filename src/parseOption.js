const updateEntryToFile = require("./updateEntryToFile").updateEntryToFile;

const parseOption = function(userArg, fileName) {
  let option = userArg[0];
  let date = new Date();
  let actions = { "--save": updateEntryToFile, "--query": "still not updated" };
  let textToParse = actions[option](userArg, fileName, date);
  return textToParse;
};

exports.parseOption = parseOption;
