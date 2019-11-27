const concatAndCount = function(newRecord, prevRecord) {
  let elementsToJoin = [
    prevRecord.empId,
    prevRecord.beverage,
    prevRecord.qty,
    prevRecord.date
  ];
  newRecord.orders.push(elementsToJoin.join(","));
  newRecord.total = newRecord.total + +prevRecord.qty;
  return newRecord;
};

const findEmpRecords = function(empId) {
  return function(record) {
    return record.empId == empId;
  };
};

const findDateRecords = function(date) {
  return function(record) {
    return date == record.date.slice(0, 10);
  };
};

const giveFilteredData = function(args, prevEntries) {
  let keyToQuery = args[1];
  let keyValue = args[2];
  let keyFunctions = { "--empId": findEmpRecords, "--date": findDateRecords };
  let matchedLogs = prevEntries.filter(keyFunctions[keyToQuery](keyValue));
  keyToQuery = args[3];
  keyValue = args[4];
  matchedLogs =
    (args[3] && matchedLogs.filter(keyFunctions[keyToQuery](keyValue))) ||
    matchedLogs;
  return matchedLogs;
};

const queryFromFile = function(userArgs, filePath, fileSystem) {
  let prevEntries = JSON.parse(fileSystem.reader(filePath, "utf8"));
  prevEntries = giveFilteredData(userArgs, prevEntries);
  let transactions = { orders: [], total: 0 };
  transactions = prevEntries.reduce(concatAndCount, transactions);

  return transactions;
};

exports.queryFromFile = queryFromFile;
