const configSaveText = function(textToConfig) {
  let heading = "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date";
  let bottomLine = textToConfig.join(",");
  return heading + "\n" + bottomLine;
};
exports.configSaveText = configSaveText;

const configQueryText = function(records) {
  let heading = "Employee ID,Beverage,Quantity,Date";
  let midlines = records.orders.join("\n");
  const beverageFromat = records.total == 1 ? "jucie" : "jucies";
  let bottomLine = `total: ${records.total} ${beverageFromat}`;
  return `${heading}\n${midlines}\n${bottomLine}`;
};
exports.configQueryText = configQueryText;
