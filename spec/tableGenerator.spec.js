#!javascript

var generator = require("../lib/tableGenerator");

describe("format", function () {
    var result;

    describe("when called with invalid data", function () {

        it("no params", function () {
            result = generator.format();
            expect(result[0]).toBe("No data.");
        });

        it("empty array", function () {
            result = generator.format([]);
            expect(result[0]).toBe("No data.");
        });

    });

    describe("when called with valid list", function () {

        beforeEach(function () {

            result = generator.format([
                {
                    name: "outdated1",
                    version: {
                        current: 1,
                        new: 2
                    }
                },
                {
                    name: "outdated2",
                    version: {
                        current: 2,
                        new: 3
                    }
                },
                {
                    name: "ok1",
                    version: {
                        current: 4,
                        new: 4
                    }
                }
            ]);
        });

        it("return table header", function () {
            expect(result[0]).toBe("| Package | Current | Latest | Status |");
        });

        it("returns valid formatted table item (line1)", function () {
            expect(result[2]).toBe("| outdated1 | 1 | 2 | OUTDATED |");
        });

        it("returns valid formatted table item (line2)", function () {
            expect(result[3]).toBe("| outdated2 | 2 | 3 | OUTDATED |");
        });

        it("returns valid formatted table item (line3)", function () {
            expect(result[4]).toBe("| ok1 | 4 | 4 | OK |");
        });

    });

});