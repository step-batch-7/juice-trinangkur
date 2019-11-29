const isPositiveInt = function(val) {
  return Number.isInteger(+val) && +val > 0;
};

const isValidId = function(element1, element2) {
  return element1 === "--empId" && isPositiveInt(element2);
};

const isValidBeverage = function(element1, element2) {
  return (
    element1 === "--beverage" && element2 != undefined && element2.length > 0
  );
};

const isValidDate = function(element1, element2) {
  return element1 === "--date" && !isNaN(Date.parse(element2));
};

const isValidQty = function(element1, element2) {
  return element1 === "--qty" && isPositiveInt(element2);
};

const isValidPair = function(element1, element2) {
  return (
    isValidId(element1, element2) ||
    isValidBeverage(element1, element2) ||
    isValidDate(element1, element2) ||
    isValidQty(element1, element2)
  );
};

exports.isValidPair = isValidPair;
