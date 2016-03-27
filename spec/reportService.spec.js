#!javascript
describe("reportService.spec.js", function () {
    var mockConfig = {packageFile: "PACKAGEFILE"},
        proxyquire = require('proxyquire'), testPackageDataString,
        packageParserMock = {}, tableGeneratorMock = {},
        fileServiceMock = {}, fsMock = {},
        service, testPackageData,
        MOCK_DEPENDENCIES = [{
            dep1: '0.1'
        }],
        MOCK_DEVDEPENDENCIES = [{
            devdep1: '0.2'
        }],
        MOCK_PARSED_DEPENDENCIES = [{name: 'alpha'}, {name: 'gamma'}],
        MOCK_PARSED_DEVDEPENDENCIES = [{name: 'beta'}],
        MOCK_TABLE_DATA = ['TEST TABLE'],
        MOCK_MERGED_LIST = "MERGED LIST",
        MOCK_UPGRADED_LIST = "UPGRADED LIST",
        TEST_INPUT;

    beforeEach(function () {
        testPackageData = {
            dependencies: MOCK_DEPENDENCIES,
            devDependencies: MOCK_DEVDEPENDENCIES
        };

        testPackageDataString = JSON.stringify(testPackageData);
        packageParserMock = {
            parse: jasmine.createSpy().andCallFake(function (data, dataType) {
                if (JSON.stringify(data) === JSON.stringify(MOCK_DEPENDENCIES)) {
                    return MOCK_PARSED_DEPENDENCIES;
                }
                if (JSON.stringify(data) === JSON.stringify(MOCK_DEVDEPENDENCIES)) {
                    return MOCK_PARSED_DEVDEPENDENCIES;
                }
                if (data === TEST_INPUT) {
                    return MOCK_UPGRADED_LIST;
                }
            }),
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
        TEST_INPUT = {
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

        describe("on parsing existing package data for dependencies", function () {
            it("should pass correct data for parsing", function () {
                expect(packageParserMock.parse.argsForCall[0][0])
                    .toEqual(MOCK_DEPENDENCIES);
            });

            it("should parse for current packages", function () {
                expect(packageParserMock.parse.argsForCall[0][1])
                    .toEqual("current");
            });
        });

        describe("on parsing existing package data for devDependencies", function () {
            it("should pass correct data for parsing", function () {
                expect(packageParserMock.parse.argsForCall[1][0])
                    .toEqual(MOCK_DEVDEPENDENCIES);
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
            it("should call merge with expected parameters (sorted)", function () {
                expect(packageParserMock.merge).toHaveBeenCalledWith([{name: 'alpha'}, {name: 'beta'}, {name: 'gamma'}], MOCK_UPGRADED_LIST);
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
