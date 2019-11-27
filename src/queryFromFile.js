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

const queryFromFile = function(userArgs, filePath, fileSystem) {
  let keyToQuery = userArgs[1];
  let keyValue = userArgs[2];
  let keyFunctions = { "--empId": findEmpRecords, "--date": findDateRecords };
  let findKeyRecords = keyFunctions[keyToQuery];
  let prevEntries = JSON.parse(fileSystem.reader(filePath, "utf8"));
  prevEntries = prevEntries.filter(findKeyRecords(keyValue));

  let transactions = { orders: [], total: 0 };
  transactions = prevEntries.reduce(concatAndCount, transactions);

  return transactions;
};

exports.queryFromFile = queryFromFile;
