const assert = require("assert");
const addNewEntry = require("../src/updateEntryToFile").addNewEntry;
const updateEntryToFile = require("../src/updateEntryToFile").updateEntryToFile;
const fs = require("fs");

describe("addNewEntry", function() {
  it("should update entry when previously no entries were there", function() {
    let date = new Date();
    let actual = addNewEntry([], "1111", "apple", "1", date);
    let expected = [{ empId: "1111", beverage: "apple", qty: "1", date: date }];
    assert.deepStrictEqual(actual, expected);
  });

  it("should return an updated object when some entries were there but with different empId", function() {
    let date1 = new Date();
    let date2 = new Date();
    let actual = addNewEntry(
      [{ empId: "1111", beverage: "apple", qty: "1", date: date1 }],
      "1112",
      "orange",
      "2",
      date2
    );
    let expected = [
      { empId: "1111", beverage: "apple", qty: "1", date: date1 },
      { empId: "1112", beverage: "orange", qty: "2", date: date2 }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("updateEntryToFile", function() {
  it("should write to file if file content is empty", function() {
    let filePath = "somePath";
    let date = new Date();

    const fileSystem = {
      reader: function() {
        return "[]";
      },
      writer: function(path, text, formater) {
        assert.strictEqual(path, "somePath");
        assert.strictEqual(
          text,
          '[{"empId":"11111","beverage":"orange","qty":"1","date":' +
            JSON.stringify(date) +
            "}]"
        );
        assert.strictEqual(formater, "utf8");
        return;
      }
    };

    let actual = updateEntryToFile(
      { "--beverage": "orange", "--empId": "11111", "--qty": "1" },
      filePath,
      fileSystem,
      date
    );

    let expected = ["11111", "orange", "1", date.toJSON()];

    assert.deepStrictEqual(actual, expected);
  });

  it("should write to file if file content is not empty", function() {
    let fileName = "somePath";
    const fileSystem = {
      reader: function() {
        return '[{"empId":"11111","beverage":"orange","qty":"1","date":"someDate"}]';
      },
      writer: function(path, text, formater) {
        assert.strictEqual(path, "somePath");
        assert.strictEqual(
          text,
          '[{"empId":"11111","beverage":"orange","qty":"1","date":"someDate"},{"empId":"11111","beverage":"orange","qty":"1","date":' +
            JSON.stringify(date) +
            "}]"
        );
        assert.strictEqual(formater, "utf8");
        return;
      }
    };
    let date = new Date();

    let actual = updateEntryToFile(
      { "--empId": "11111", "--beverage": "orange", "--qty": "1" },
      fileName,
      fileSystem,
      date
    );
    let expected = ["11111", "orange", "1", date.toJSON()];

    assert.deepStrictEqual(actual, expected);
  });
});
