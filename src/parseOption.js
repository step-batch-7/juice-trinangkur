const updateEntryToFile = require("./updateEntryToFile").updateEntryToFile;
const queryFromFile = require("./queryFromFile").queryFromFile;
const configText = require("./configText");

const parseOption = function(userArg, filePath, fileSystem) {
  const option = userArg[0];
  const date = new Date();
  let readWriteActions = {
    "--save": updateEntryToFile,
    "--query": queryFromFile
  };
  if (
    !fileSystem.exists(filePath) ||
    fileSystem.reader(filePath, "utf8") == ""
  ) {
    fileSystem.writer(filePath, "{}", "utf8");
  }
  let textToFormat = readWriteActions[option](
    userArg,
    filePath,
    fileSystem,
    date
  );
  let outputTextActions = {
    "--save": configText.configSaveText,
    "--query": configText.configQueryText
  };
  return outputTextActions[option](textToFormat);
};

exports.parseOption = parseOption;
