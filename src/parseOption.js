const updateEntryToFile = require("./updateEntryToFile").updateEntryToFile;
const queryFromFile = require("./queryFromFile").queryFromFile;
const configText = require("./configText");
const parseValidOption = require("./parseValidOptions").parseValidOptions;

const parseOption = function(userArg, filePath, fileSystem, date) {
  commandAndOptions = parseValidOption(userArg);
  if (!commandAndOptions) {
    return "wrong input";
  }
  let readWriteActions = {
    "--save": updateEntryToFile,
    "--query": queryFromFile
  };
  if (
    !fileSystem.exists(filePath) ||
    fileSystem.reader(filePath, "utf8") == ""
  ) {
    fileSystem.writer(filePath, "[]", "utf8");
  }
  let textToFormat = readWriteActions[commandAndOptions.command](
    commandAndOptions.options,
    filePath,
    fileSystem,
    date
  );
  let outputTextActions = {
    "--save": configText.configSaveText,
    "--query": configText.configQueryText
  };
  return outputTextActions[commandAndOptions.command](textToFormat);
};

exports.parseOption = parseOption;
