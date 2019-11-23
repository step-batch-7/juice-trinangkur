const parseOption = require("./src/parseOption").parseOption;

const main = function() {
  let fileName = "./annaJuiceEntries.json";
  let userArgs = process.argv.slice(2);
  let stringToDisplay = parseOption(userArgs, fileName);
  console.log(stringToDisplay);
};

main();

console.log("Anna Juice Ltd");
