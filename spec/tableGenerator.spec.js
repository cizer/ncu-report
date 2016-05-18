#!javascript

describe("format", function() {

    var service = require('../lib/tableGenerator'),
        result, testPackageList;

    describe("when called with invalid data", function() {

        it("no params", function() {
            result = service.format();
            expect(result[0]).toBe("No data.");
        });

        it("empty array", function() {
            result = service.format([]);
            expect(result[0]).toBe("No data.");
        });
    });

    describe("when called with valid list", function() {

        beforeEach(function() {
          testPackageList = [{
                name: "outdated1",
                version: {
                    current: '1.0',
                    installed: '1.5',
                    new: '2.0'
                }
            }, {
                name: "outdated2",
                version: {
                    current: '2.0',
                    installed: '2.5',
                    new: '3.0'
                }
            }, {
                name: "ok1",
                version: {
                    current: '^4.0',
                    installed: '4.0'
                }
            }];
            result = service.format(testPackageList);
        });

        it("return table header", function() {
            expect(result[0]).toBe("| Package | Current | Installed | Latest | Status |");
        });

        it("returns valid formatted table item (line1)", function() {
            expect(result[2]).toBe("| outdated1 | 1.0 | 1.5 | 2.0 | OUTDATED |");
        });

        it("returns valid formatted table item (line2)", function() {
            expect(result[3]).toBe("| outdated2 | 2.0 | 2.5 | 3.0 | OUTDATED |");
        });

        it("returns valid formatted table item (line3)", function() {
            expect(result[4]).toBe("| ok1 | ^4.0 | 4.0 | ^4.0 | OK |");
        });
    });


    describe("when called with valid list and docuwiki format", function() {

        beforeEach(function() {
          testPackageList = [{
                name: "outdated1",
                version: {
                    current: '1.0',
                    installed: '1.5',
                    new: '2.0'
                }
            }, {
                name: "outdated2",
                version: {
                    current: '2.0',
                    installed: '2.5',
                    new: '3.0'
                }
            }, {
                name: "ok1",
                version: {
                    current: '^4.0',
                    installed: '4.0'
                }
            }];
            result = service.format(testPackageList, 'dokuwiki');
        });

        it("return table header", function() {
            expect(result[0]).toBe("| Package ^ Current ^ Installed ^ Latest ^ Status ^");
        });

        it("returns valid formatted table item (line1)", function() {
            expect(result[1]).toBe("^ outdated1 | 1.0 | @red:1.5 | 2.0 | OUTDATED |");
        });

        it("returns valid formatted table item (line2)", function() {
            expect(result[2]).toBe("^ outdated2 | 2.0 | @red:2.5 | 3.0 | OUTDATED |");
        });

        it("returns valid formatted table item (line3)", function() {
            expect(result[3]).toBe("^ ok1 | %%^%%4.0 | @green:4.0 | %%^%%4.0 | OK |");
        });
    });

});
