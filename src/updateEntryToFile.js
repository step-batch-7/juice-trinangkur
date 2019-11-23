const fs = require("fs");
const addNewEntry = function(prevEntry, empId, beverageName, qty, date) {
  const entryDetails = { beverage: beverageName, qty: qty, date: date };
  if (!prevEntry.hasOwnProperty(empId)) {
    prevEntry[empId] = { orders: [], total: "0" };
  }

  prevEntry[empId].orders.push(entryDetails);
  prevEntry[empId].total = +prevEntry[empId].total + +entryDetails.qty + "";
  return prevEntry;
};

const updateEntryToFile = function(newEntry, filePath, date) {
  const empId = newEntry[4];
  const beverageName = newEntry[2];
  const qty = newEntry[6];
  let prevEntry = fs.readFileSync(filePath, "utf8");

  if (prevEntry == "") {
    prevEntry = "{}";
  }

  prevEntry = JSON.parse(prevEntry);
  let updatedRecord = addNewEntry(prevEntry, empId, beverageName, qty, date);
  fs.writeFileSync(filePath, JSON.stringify(updatedRecord), "utf8");
  return newEntry;
};

exports.addNewEntry = addNewEntry;
exports.updateEntryToFile = updateEntryToFile;
