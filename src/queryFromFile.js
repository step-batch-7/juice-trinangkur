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

const findRecords = function(key, valueToSearch) {
  return function(record) {
    return record[key] == valueToSearch;
  };
};

const findDateRecords = function(date) {
  return function(record) {
    return date == record.date.slice(0, 10);
  };
};

const giveFilteredData = function(args, prevEntries) {
  let empId = args["--empId"];
  let matchedLogs =
    (empId && prevEntries.filter(findRecords("empId", empId))) || prevEntries;
  let date = args["--date"];
  matchedLogs =
    (date && matchedLogs.filter(findDateRecords(date))) || matchedLogs;
  let beverage = args["--beverage"];
  matchedLogs =
    (beverage && matchedLogs.filter(findRecords("beverage", beverage))) ||
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
