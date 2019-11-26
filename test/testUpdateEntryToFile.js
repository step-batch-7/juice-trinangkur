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
        empId: "1111",
        orders: [{ beverage: "apple", qty: "1", date: date }]
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
          empId: "1111",
          orders: [{ beverage: "apple", qty: "1", date: date1 }]
        }
      },
      "1112",
      "orange",
      "2",
      date2
    );
    let expected = {
      "1111": {
        empId: "1111",
        orders: [{ beverage: "apple", qty: "1", date: date1 }]
      },
      "1112": {
        empId: "1112",
        orders: [{ beverage: "orange", qty: "2", date: date2 }]
      }
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should update object if same empId is already there", function() {
    let date1 = new Date();
    let date2 = new Date();
    actual = addNewEntry(
      {
        "1111": {
          empId: "1111",
          orders: [{ beverage: "apple", qty: "1", date: date1 }]
        }
      },
      "1111",
      "orange",
      "2",
      date2
    );
    let expected = {
      "1111": {
        empId: "1111",
        orders: [
          { beverage: "apple", qty: "1", date: date1 },
          { beverage: "orange", qty: "2", date: date2 }
        ]
      }
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("updateEntryToFile", function() {
  it("should write to file if file content is empty", function() {
    let filePath = "./test/testFile.txt";
    let date = new Date();

    const fileSystem = {
      reader: function() {
        return "{}";
      },
      writer: function() {
        return;
      }
    };

    let actual = updateEntryToFile(
      ["--save", "--beverage", "orange", "--empId", "11111", "--qty", "1"],
      filePath,
      fileSystem,
      date
    );

    let expected = ["11111", "orange", "1", date.toJSON()];

    assert.deepStrictEqual(actual, expected);
  });

  it("should write to file if file content is not empty", function() {
    let fileName = "./test/testFile.txt";
    const fileSystem = {
      reader: function() {
        return '{"11111":{"empId":"11111","orders":[{"beverage":"orange","qty":"1","date":"2019-11-23T10:59:10.216Z"}]}}';
      },
      writer: function() {
        return;
      }
    };
    let date = new Date();

    let actual = updateEntryToFile(
      ["--save", "--beverage", "orange", "--empId", "11111", "--qty", "1"],
      fileName,
      fileSystem,
      date
    );
    let expected = ["11111", "orange", "1", date.toJSON()];

    assert.deepStrictEqual(actual, expected);
  });
});
