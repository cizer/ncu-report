#!javascript

var proxyquire = require('proxyquire'), fsMock = {}, fileMock,
    service = proxyquire("../lib/fileService", {
        'fs': fsMock
    });

ddescribe("write", function () {

    fsMock.mkdirSync = jasmine.createSpy();
    fileMock = {
        on: jasmine.createSpy(),
        write: jasmine.createSpy(),
        end: jasmine.createSpy()
    };
    fsMock.createWriteStream = jasmine.createSpy().andReturn(fileMock);

    describe("when output directory exists", function () {
        beforeEach(function () {
            fsMock.existsSync = jasmine.createSpy().andReturn(true);
            service.write([]);
        });

        it("should check output directory exists", function () {
            expect(fsMock.existsSync).toHaveBeenCalledWith("./ncu-report");
        });

        it("should not create directory", function () {
            expect(fsMock.mkdirSync).not.toHaveBeenCalled();
        });
    });

    describe("when output directory does not exist", function () {

        var testData = ["line1", "line2"];

        beforeEach(function () {
            fsMock.existsSync = jasmine.createSpy().andReturn(false);
            service.write(testData);
        });

        it("should create directory", function () {
            expect(fsMock.mkdirSync).toHaveBeenCalledWith("./ncu-report");
        });

        it("should create output file stream", function () {
            expect(fsMock.createWriteStream).toHaveBeenCalledWith("./ncu-report/ncu-report.md");
        });


        it("should call file.on", function () {
            expect(fileMock.end).toHaveBeenCalled();
        });

        describe("when array of data is provided", function () {

            it("should write data to file", function () {
                expect(fileMock.write).toHaveBeenCalledWith(testData[0] + '\n');
            });

            it("should write data to file", function () {
                expect(fileMock.write).toHaveBeenCalledWith(testData[1] + '\n');
            });
        });

        it("should call file.end", function () {
            expect(fileMock.end).toHaveBeenCalled();
        });

    });

});