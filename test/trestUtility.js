const utility = require("../src/utility");
const assert = require("assert");

describe("isValidPair", function() {
  it("should validate pair of beverages", function() {
    let actual = utility.isValidPair("--beverage", "orange");
    assert.strictEqual(actual, true);
  });
  it("should validate pair of qty", function() {
    let actual = utility.isValidPair("--qty", "2");
    assert.strictEqual(actual, true);
    actual = utility.isValidPair("--qty", "a");
    assert.strictEqual(actual, false);
    actual = utility.isValidPair("--qty", "0");
    assert.strictEqual(actual, false);
  });
  it("should validate pair of empId", function() {
    let actual = utility.isValidPair("--empId", "12345");
    assert.strictEqual(actual, true);
  });
  it("should vlaidate pair of date", function() {
    let actual = utility.isValidPair("--date", "a");
    assert.strictEqual(actual, false);
    actual = utility.isValidPair("--date", "2015-12-03");
    assert.strictEqual(actual, true);
  });
});
