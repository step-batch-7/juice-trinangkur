const insertEmpIdAndAdd = function(newRecord, prevRecord) {
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

const findRecords = function(empId) {
  return function(record) {
    return record.empId == empId;
  };
};

const queryFromFile = function(userArgs, filePath, fileSystem) {
  let empId = userArgs[2];
  let prevEntries = JSON.parse(fileSystem.reader(filePath, "utf8"));
  let transactions = { orders: [], total: 0 };
  prevEntries = prevEntries.filter(findRecords(empId));

  transactions = prevEntries.reduce(insertEmpIdAndAdd, transactions);

  return transactions;
};

exports.queryFromFile = queryFromFile;
