#!javascript

describe("packageParser.spec", function() {
  var parser = require("../lib/packageParser");

  describe("parse", function() {
    var result, testVersionType = "BLAH";
    var testInput = {
      package1: 1,
      package2: 2
    };

    beforeEach(function() {
      result = parser.parse(testInput, testVersionType);
    });

    it("should set name to property name", function() {
      expect(result[0].name).toBe("package1");
    });

    it("should set new version to property value", function() {
      expect(result[0].version[testVersionType]).toBe(1);
    });

    it("should set current version to undefined", function() {
      expect(result[0].version.current).toBeUndefined();
    });

  });

  describe("merge", function() {
    var result,
      current = [{
        name: "package1",
        version: {
          current: 1
        }
      }, {
        name: "latest",
        version: {
          current: 10
        }
      }],
      upgraded = [{
        name: "package1",
        version: {
          new: 2
        }
      }];

    beforeEach(function() {
      result = parser.merge(current, upgraded, 'name', 'new');
    });

    describe("should set name", function() {

      it("in first postion", function() {
        expect(result[0].name).toBe(current[0].name);
      });

      it("in second position", function() {
        expect(result[1].name).toBe(current[1].name);
      });

    });

    it("should preserve current version", function() {
      expect(result[0].version.current)
        .toBe(current[0].version.current);
    });

    it("should set new version to value from upgraded", function() {
      expect(result[0].version.new).toBe(upgraded[0].version.new);
    });

    it("should set new version to current if not specified", function() {
      expect(result[1].version.new).toBeUndefined();
    });
  });
});
