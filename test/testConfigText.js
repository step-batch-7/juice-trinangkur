const assert = require("assert");
const configText = require("../src/configText");

describe("configSaveText", function() {
  it("should return configured text of input", function() {
    let actual = configText.configSaveText([
      "11111",
      "orange",
      "1",
      "someDate"
    ]);
    let expected =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n11111,orange,1,someDate";
    assert.strictEqual(actual, expected);
  });
});

describe("configQueryText", function() {
  it("should return config text of the given key if present", function() {
    let actual = configText.configQueryText({
      orders: ["11111,orange,1,someDate"],
      total: 1
    });
    let expected =
      "Employee ID,Beverage,Quantity,Date\n11111,orange,1,someDate\ntotal: 1 jucies";
    assert.strictEqual(actual, expected);
  });
  it("should return empty list when no record of given input is there", function() {
    let actual = configText.configQueryText({
      orders: [],
      total: 0
    });
    let expected = "Employee ID,Beverage,Quantity,Date\n\ntotal: 0 jucies";
    assert.strictEqual(actual, expected);
  });
});
