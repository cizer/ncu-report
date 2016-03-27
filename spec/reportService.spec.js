#!javascript
describe("reportService.spec.js", function () {
    var mockConfig = {packageFile: "PACKAGEFILE"},
        proxyquire = require('proxyquire'), testPackageDataString,
        packageParserMock = {}, tableGeneratorMock = {},
        fileServiceMock = {}, fsMock = {},
        service, testPackageData,
        MOCK_TABLE_DATA = ['TEST TABLE'],
        MOCK_MERGED_LIST = "MERGED LIST";

    beforeEach(function () {

        testPackageData = {
            dependencies: {
                dep1: '0.1'
            },
            devDependencies: {
                devdep1: '0.1'
            }
        };

        testPackageDataString = JSON.stringify(testPackageData);
        packageParserMock = {
            parse: jasmine.createSpy().andReturn([1]),
            merge: jasmine.createSpy().andReturn(MOCK_MERGED_LIST)
        };
        tableGeneratorMock = {
            format: jasmine.createSpy().andReturn(MOCK_TABLE_DATA)
        };
        fileServiceMock = {
            write: jasmine.createSpy()
        };
        fsMock = {
            readFileSync: jasmine.createSpy().andReturn(testPackageDataString)
        };
        service = proxyquire("../lib/reportService",
            {
                './packageParser': packageParserMock,
                './tableGenerator': tableGeneratorMock,
                './fileService': fileServiceMock,
                'fs': fsMock
            });
    });

    describe("generate()", function () {
        var TEST_INPUT = {
            test1: 1.1,
            test2: 1.2
        };

        beforeEach(function () {
            service.generate(mockConfig, TEST_INPUT);
        });

        it("should call method to read file with correct parameters", function () {
            expect(fsMock.readFileSync)
                .toHaveBeenCalledWith(mockConfig.packageFile, 'utf8');
        });

        describe("on parsing existing package data for devDependencies", function () {
            it("should pass correct data for parsing", function () {
                expect(packageParserMock.parse.argsForCall[0][0])
                    .toEqual(testPackageData.devDependencies);
            });

            it("should parse for current packages", function () {
                expect(packageParserMock.parse.argsForCall[0][1])
                    .toEqual("current");
            });
        });

        describe("on parsing existing package data for dependencies", function () {
            it("should pass correct data for parsing", function () {
                expect(packageParserMock.parse.argsForCall[1][0])
                    .toEqual(testPackageData.dependencies);
            });

            it("should parse for current packages", function () {
                expect(packageParserMock.parse.argsForCall[1][1])
                    .toEqual("current");
            });
        });

        describe("on parsing new package data from ncu", function () {
            it("should pass correct data for parsing", function () {
                expect(packageParserMock.parse.argsForCall[2][0])
                    .toEqual(TEST_INPUT);
            });

            it("should parse for new packages", function () {
                expect(packageParserMock.parse.argsForCall[2][1])
                    .toEqual("new");
            });
        });

        describe("on merging package data", function () {
            it("should call merge with expected parameters", function () {
                expect(packageParserMock.merge).toHaveBeenCalledWith([1, 1], [1]);
            });
        });

        describe("on generating the table", function () {
            it("call format on mergedlist", function () {
                expect(tableGeneratorMock.format).toHaveBeenCalledWith(MOCK_MERGED_LIST);
            });
        });

        describe("on writing the file", function () {
            it("call write with the formatted table data with the report date", function () {
                MOCK_TABLE_DATA.push('<sup><sub>Report generated on: ' + Date() + '<sub><sup>');
                expect(fileServiceMock.write).toHaveBeenCalledWith(MOCK_TABLE_DATA);
            });
        });
    });
});
