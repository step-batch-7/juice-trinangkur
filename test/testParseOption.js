const parseOption = require("../src/parseOption").parseOption;
const assert = require("assert");

describe("parseOption.js", function() {
  it("retrun output text for save function when file exist", function() {
    const fileSysetm = {
      reader: function() {
        return "[]";
      },
      writer: function(path, text, formater) {
        assert.strictEqual(path, "somePath");
        assert.strictEqual(formater, "utf8");
      },
      exists: function(path) {
        assert.strictEqual(path, "somePath");
        return true;
      }
    };
    date = new Date();
    let actual = parseOption(
      ["--save", "--beverage", "orange", "--empId", "11111", "--qty", "2"],
      "somePath",
      fileSysetm,
      date
    );
    let expected =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n11111,orange,2," +
      date.toJSON();
    assert.strictEqual(actual, expected);
  });
  it("retrun output text for save function when file doesn't exist", function() {
    const fileSysetm = {
      reader: function() {
        return "[]";
      },
      writer: function(path, text, formater) {
        assert.strictEqual(path, "somePath");
        assert.strictEqual(formater, "utf8");
      },
      exists: function(path) {
        assert.strictEqual(path, "somePath");
        return false;
      }
    };
    date = new Date();
    let actual = parseOption(
      ["--save", "--beverage", "orange", "--empId", "11111", "--qty", "2"],
      "somePath",
      fileSysetm,
      date
    );
    let expected =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n11111,orange,2," +
      date.toJSON();
    assert.strictEqual(actual, expected);
  });
  it("should return output text for query if file is not there", function() {
    const fileSysetm = {
      reader: function() {
        return "[]";
      },
      writer: function(path, text, formater) {
        assert.strictEqual(path, "somePath");
        assert.strictEqual(formater, "utf8");
      },
      exists: function(path) {
        assert.strictEqual(path, "somePath");
        return false;
      }
    };
    date = new Date();
    let actual = parseOption(
      ["--query", "empId", "11111"],
      "somePath",
      fileSysetm,
      date
    );
    let expected = "Employee ID,Beverage,Quantity,Date\n\ntotal: 0 jucies";
    assert.strictEqual(actual, expected);
  });
  it("should return output text for query if file is there", function() {
    const fileSysetm = {
      reader: function() {
        return "[]";
      },
      writer: function(path, text, formater) {
        assert.strictEqual(path, "somePath");
        assert.strictEqual(formater, "utf8");
      },
      exists: function(path) {
        assert.strictEqual(path, "somePath");
        return true;
      }
    };
    date = new Date();
    let actual = parseOption(
      ["--query", "empId", "11111"],
      "somePath",
      fileSysetm,
      date
    );
    let expected = "Employee ID,Beverage,Quantity,Date\n\ntotal: 0 jucies";
    assert.strictEqual(actual, expected);
  });
});
