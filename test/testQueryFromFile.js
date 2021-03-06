const queryFromFile = require("../src/queryFromFile").queryFromFile;
const assert = require("assert");

describe("queryFromFile", function() {
  it("should find tha value from the records of given key if it is already there", function() {
    const fileSystem = {
      reader: function() {
        return '[{"empId":"11111","beverage":"orange","qty":"1","date":"2019-11-25T11:02:31.571Z"}]';
      }
    };

    let actual = queryFromFile({ "--empID": "11111" }, "filePath", fileSystem);
    let expected = {
      orders: ["11111,orange,1,2019-11-25T11:02:31.571Z"],
      total: 1
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should return total and all of one empId having more than one record", function() {
    const fileSystem = {
      reader: function() {
        return '[{"empId":"1111","beverage":"orange","qty":"1","date":"2019-11-25T11:05:15.702Z"},{"empId":"1111","beverage":"orange","qty":"1","date":"2019-11-25T12:38:29.890Z"}]';
      }
    };

    let actual = queryFromFile({ "--empID": "1111" }, "filePath", fileSystem);
    let expected = {
      orders: [
        "1111,orange,1,2019-11-25T11:05:15.702Z",
        "1111,orange,1,2019-11-25T12:38:29.890Z"
      ],
      total: 2
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should return empty array if no such record is there", function() {
    const fileSystem = {
      reader: function() {
        return "[]";
      }
    };
    let actual = queryFromFile({ "--empID": "11111" }, "filePath", fileSystem);
    assert.deepStrictEqual(actual, { orders: [], total: 0 });
  });
  it("should return record along date given if record is there", function() {
    const fileSystem = {
      reader: function() {
        return '[{"empId":"1111","beverage":"orange","qty":"1","date":"2019-11-25T11:05:15.702Z"},{"empId":"1111","beverage":"orange","qty":"1","date":"2019-11-25T12:38:29.890Z"}]';
      }
    };

    let actual = queryFromFile(
      { "--date": "2019-11-25" },
      "filePath",
      fileSystem
    );

    let expected = {
      orders: [
        "1111,orange,1,2019-11-25T11:05:15.702Z",
        "1111,orange,1,2019-11-25T12:38:29.890Z"
      ],
      total: 2
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should filter record along date given if record is there", function() {
    const fileSystem = {
      reader: function() {
        return '[{"empId":"1111","beverage":"orange","qty":"1","date":"2019-11-25T11:05:15.702Z"},{"empId":"1111","beverage":"orange","qty":"1","date":"2019-11-24T12:38:29.890Z"}]';
      }
    };

    let actual = queryFromFile(
      { "--date": "2019-11-25" },
      "filePath",
      fileSystem
    );

    let expected = {
      orders: ["1111,orange,1,2019-11-25T11:05:15.702Z"],
      total: 1
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should filter record along date and id given if record is there", function() {
    const fileSystem = {
      reader: function() {
        return '[{"empId":"1111","beverage":"orange","qty":"1","date":"2019-11-25T11:05:15.702Z"},{"empId":"1112","beverage":"orange","qty":"1","date":"2019-11-25T12:38:29.890Z"},{"empId":"1112","beverage":"orange","qty":"1","date":"2019-11-24T12:38:29.990Z"}]';
      }
    };

    let actual = queryFromFile(
      { "--date": "2019-11-25", "--empId": "1112" },
      "filePath",
      fileSystem
    );

    let expected = {
      orders: ["1112,orange,1,2019-11-25T12:38:29.890Z"],
      total: 1
    };
    assert.deepStrictEqual(actual, expected);
  });
});
