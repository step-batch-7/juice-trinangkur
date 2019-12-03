const parseOption = require("./src/parseOption").parseOption;
const fs = require("fs");

const main = function() {
  let fileName = "./annaJuiceEntries.json";
  let userArgs = process.argv.slice(2);
  let fileSystem = {
    reader: fs.readFileSync,
    exists: fs.existsSync,
    writer: fs.writeFileSync
  };
  let stringToDisplay = parseOption(userArgs, fileName, fileSystem, new Date());
  console.log(stringToDisplay);
};

main();
