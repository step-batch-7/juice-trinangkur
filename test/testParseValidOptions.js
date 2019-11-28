const assert = require("assert");
const parseValidOptions = require("../src/parseValidOptions").parseValidOptions;

describe("parseValidOption", function() {
  it("should invalidate if any given arguements are wrong for save", function() {
    let actual = parseValidOptions([
      "-save",
      "--empId",
      "11111",
      "--beverage",
      "orange",
      "--qty",
      "2"
    ]);
    assert.strictEqual(actual, false);
    actual = parseValidOptions([
      "--save",
      "-empId",
      "11111",
      "--beverage",
      "orange",
      "--qty",
      "2"
    ]);
    assert.strictEqual(actual, false);
    actual = parseValidOptions([
      "--save",
      "--empId",
      "11111",
      "-beverage",
      "orange",
      "--qty",
      "2"
    ]);
    assert.strictEqual(actual, false);
    actual = parseValidOptions([
      "--save",
      "--empId",
      "11111",
      "--beverage",
      "orange",
      "-qty",
      "2"
    ]);
    assert.strictEqual(actual, false);
  });
  it("should invalidate if any of the given argument is wrong for query", function() {
    let actual = parseValidOptions(["-query", "--empId", "11111"]);
    assert.strictEqual(actual, false);
    actual = parseValidOptions([
      "--query",
      "--empId",
      "11111",
      "-beverage",
      "orange"
    ]);
    assert.strictEqual(actual, false);
    actual = parseValidOptions([
      "--query",
      "--beverage",
      "orange",
      "-empId",
      "11111"
    ]);
    assert.strictEqual(actual, false);
    actual = parseValidOptions([
      "--query",
      "-date",
      "2109-12-13",
      "--beverage",
      "orange",
      "--empId",
      "11111"
    ]);
    assert.strictEqual(actual, false);
  });
  it("should invalidate if any given format of anrgument is worng", function() {
    actual = parseValidOptions([
      "--query",
      "--date",
      "abc",
      "--beverage",
      "orange",
      "--empId",
      "11111"
    ]);
    assert.strictEqual(actual, false);
    actual = parseValidOptions([
      "--query",
      "--date",
      "2109-12-01",
      "--beverage",
      "orange",
      "--empId",
      "0"
    ]);
    assert.strictEqual(actual, false);
    actual = parseValidOptions([
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "1111"
    ]);
    assert.strictEqual(actual, false);
    actual = parseValidOptions([
      "--query",
      "--qty",
      "0",
      "--beverage",
      "orange",
      "--empId",
      "1111"
    ]);
    assert.strictEqual(actual, false);
  });
  it("should give desired object if all arguments are given for save", function() {
    let actual = parseValidOptions([
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "1111",
      "--qty",
      "1"
    ]);
    let expected = {
      command: "--save",
      options: { "--beverage": "orange", "--empId": "1111", "--qty": "1" }
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should give desired object if all arguments are given for save even if same options are repeated", function() {
    let actual = parseValidOptions([
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "1111",
      "--qty",
      "1",
      "--beverage",
      "apple",
      "--empId",
      "1112"
    ]);
    let expected = {
      command: "--save",
      options: { "--beverage": "apple", "--empId": "1112", "--qty": "1" }
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should give desired object if all arguments are given for query", function() {
    let actual = parseValidOptions([
      "--query",
      "--beverage",
      "orange",
      "--empId",
      "1111"
    ]);
    let expected = {
      command: "--query",
      options: { "--beverage": "orange", "--empId": "1111" }
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should give desired object if all arguments are given for query even if options are repeated", function() {
    let actual = parseValidOptions([
      "--query",
      "--beverage",
      "orange",
      "--empId",
      "1111",
      "--empId",
      "1121"
    ]);
    let expected = {
      command: "--query",
      options: { "--beverage": "orange", "--empId": "1121" }
    };
    assert.deepStrictEqual(actual, expected);
  });
});
