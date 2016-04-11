#!javascript

describe("acceptance test", function() {

  var reportService = require('../lib/reportService');
  var fs = require('fs');
  var config = {
      packageFile: "./spec/test_package.json",
      outputFile: "./ncu-report/testoutput.md"
    },
    reportLines = [];

  var TEST_INPUT = {
    'test1': '1.1',
    'test2': '2.2',
    'test3': '0.3',
    'test4': '1.4'
  };
  var TEST_INSTALLED = {
    'test1': '0.2',
    'test2': '1.2',
    'test3': '0.3',
    'test4': '0.4'
  };
  var runOnce = false;

  beforeEach(function() {
    if (!runOnce) {
      reportLines = reportService.generate(config, TEST_INPUT, TEST_INSTALLED);
      runOnce = true;
    }
  });

  describe("the report", function() {

    it("header", function() {
      expect(reportLines[0]).toBe("| Package | Current | Installed | Latest | Status |");
    });

    it("header divider", function() {
      expect(reportLines[1]).toBe("| :------ | ------: | --------: | -----: | :----: |");
    });

    it("test1 is outdated", function() {
      expect(reportLines[2]).toBe("| test1 | 0.1 | 0.2 | 1.1 | OUTDATED |");
    });

    it("test2 is outdated", function() {
      expect(reportLines[3]).toBe("| test2 | 0.2 | 1.2 | 2.2 | OUTDATED |");
    });

    it("test3 is OK", function() {
      expect(reportLines[4]).toBe("| test3 | 0.3 | 0.3 | 0.3 | OK |");
    });

    it("test4 is OUTDATED", function() {
      expect(reportLines[5]).toBe("| test4 | 0.4 | 0.4 | 1.4 | OUTDATED |");
    });

    it("footer", function() {
      expect(reportLines[6]).toContain("<sup><sub>Report generated on: ");
    });
  });

});
