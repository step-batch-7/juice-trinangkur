const insertEmpIdAndAdd = function(empId) {
  return function(newRecord, prevRecord) {
    let beverage = prevRecord.beverage;
    let qty = prevRecord.qty;
    let date = prevRecord.date;
    let elementsToJoin = [empId, beverage, qty, date];
    newRecord.orders.push(elementsToJoin.join(","));
    newRecord.total = newRecord.total + +prevRecord.qty;
    return newRecord;
  };
};

const queryFromFile = function(userArgs, filePath, fileSystem) {
  let empId = userArgs[2];
  let prevEntries = JSON.parse(fileSystem.reader(filePath, "utf8"));
  let transactions = { orders: [], total: 0 };

  if (prevEntries.hasOwnProperty(empId)) {
    transactions = prevEntries[empId].orders.reduce(
      insertEmpIdAndAdd(empId),
      transactions
    );
  }

  return transactions;
};

exports.queryFromFile = queryFromFile;
