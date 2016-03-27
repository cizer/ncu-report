#!javascript
describe("acceptance test", function () {

    var reportService = require('../lib/reportService');
    var fs = require('fs');
    var config = {
        packageFile: "./spec/test_package.json"
    }, report, reportLines;

    var TEST_INPUT = {'test1': '1.1', 'test4': '1.4'};
    var runOnce = false;

    beforeEach(function () {
        if(!runOnce) {
            runs(function () {

                reportService.generate(config, TEST_INPUT);
                setTimeout(function () {
                    runOnce = true
                }, 100)
            });

            waitsFor(function () {
                return runOnce;
            });

            report = fs.readFileSync('./ncu-report/ncu-report.md', 'utf8');
            reportLines = report.split('\n');
        }
    });

    describe("the report", function(){

        it("header", function () {
            expect(reportLines[0]).toBe("| Package | Current | Latest | Status |");
        });

        it("header divider", function () {
            expect(reportLines[1]).toBe("| :------ | ------: | -----: | :----: |");
        });

        it("test1 is outdated", function () {
            expect(reportLines[2]).toBe("| test1 | 0.1 | 1.1 | OUTDATED |");
        });

        it("test2 is OK", function () {
            expect(reportLines[3]).toBe("| test2 | 0.2 | 0.2 | OK |");
        });

        it("test3 is OK", function () {
            expect(reportLines[4]).toBe("| test3 | 0.3 | 0.3 | OK |");
        });

        it("test4 is OUTDATED", function () {
            expect(reportLines[5]).toBe("| test4 | 0.4 | 1.4 | OUTDATED |");
        });

        it("footer", function () {
            expect(reportLines[6]).toContain("<sup><sub>Report generated on: ");
        });
    });


});