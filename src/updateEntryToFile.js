const addNewEntry = function(prevEntry, empId, beverageName, qty, date) {
  const entryDetails = {
    empId: empId,
    beverage: beverageName,
    qty: qty,
    date: date
  };
  prevEntry.push(entryDetails);
  return prevEntry;
};

const updateEntryToFile = function(newEntry, filePath, fileSystem, date) {
  const empId = newEntry["--empId"];
  const beverageName = newEntry["--beverage"];
  const qty = newEntry["--qty"];
  let prevEntry = fileSystem.reader(filePath, "utf8");

  prevEntry = JSON.parse(prevEntry);
  let updatedRecord = addNewEntry(prevEntry, empId, beverageName, qty, date);
  fileSystem.writer(filePath, JSON.stringify(updatedRecord), "utf8");
  return [empId, beverageName, qty, date.toJSON()];
};

exports.addNewEntry = addNewEntry;
exports.updateEntryToFile = updateEntryToFile;
