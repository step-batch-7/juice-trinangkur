const assert = require("assert");
const addNewEntry = require("../src/updateEntryToFile").addNewEntry;
const updateEntryToFile = require("../src/updateEntryToFile").updateEntryToFile;
const fs = require("fs");

describe("addNewEntry", function() {
  it("should return new object when previously no entries were there", function() {
    let date = new Date();
    let actual = addNewEntry({}, "1111", "apple", "1", date);
    let expected = {
      "1111": {
        orders: [{ beverage: "apple", qty: "1", date: date }],
        total: "1"
      }
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should return an updated object when some entries were there but with different empId", function() {
    let date1 = new Date();
    let date2 = new Date();
    let actual = addNewEntry(
      {
        "1111": {
          orders: [{ beverage: "apple", qty: "1", date: date1 }],
          total: "1"
        }
      },
      "1112",
      "orange",
      "2",
      date2
    );
    let expected = {
      "1111": {
        orders: [{ beverage: "apple", qty: "1", date: date1 }],
        total: "1"
      },
      "1112": {
        orders: [{ beverage: "orange", qty: "2", date: date2 }],
        total: "2"
      }
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should update ibject if same empId is already there", function() {
    let date1 = new Date();
    let date2 = new Date();
    actual = addNewEntry(
      {
        "1111": {
          orders: [{ beverage: "apple", qty: "1", date: date1 }],
          total: "1"
        }
      },
      "1111",
      "orange",
      "2",
      date2
    );
    let expected = {
      "1111": {
        orders: [
          { beverage: "apple", qty: "1", date: date1 },
          { beverage: "orange", qty: "2", date: date2 }
        ],
        total: "3"
      }
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("updateEntryToFile", function() {
  it("should write to file if file content is empty", function() {
    let fileName = "./test/testFile.txt";
    fs.writeFileSync(fileName, "", "utf8");
    let date = new Date();

    updateEntryToFile(
      ["--save", "--beverage", "orange", "--empId", "11111", "--qty", "1"],
      fileName,
      date
    );
    let actual = fs.readFileSync(fileName, "utf8");
    let expected =
      '{"11111":{"orders":[{"beverage":"orange","qty":"1","date":' +
      JSON.stringify(date) +
      '}],"total":"1"}}';

    assert.strictEqual(actual, expected);
    fs.unlinkSync(fileName);
  });
  it("should write to file if file content is not empty", function() {
    let fileName = "./test/testFile.txt";
    fs.writeFileSync(
      fileName,
      '{"11111":{"orders":[{"beverage":"orange","qty":"1","date":"2019-11-23T10:59:10.216Z"}],"total":"1"}}',
      "utf8"
    );
    let date = new Date();

    updateEntryToFile(
      ["--save", "--beverage", "orange", "--empId", "11111", "--qty", "1"],
      fileName,
      date
    );
    let actual = fs.readFileSync(fileName, "utf8");
    let expected =
      '{"11111":{"orders":[{"beverage":"orange","qty":"1","date":"2019-11-23T10:59:10.216Z"},{"beverage":"orange","qty":"1","date":' +
      JSON.stringify(date) +
      '}],"total":"2"}}';

    assert.strictEqual(actual, expected);
    fs.unlinkSync(fileName);
  });
});
