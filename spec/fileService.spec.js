#!javascript
describe("write", function() {
  var proxyquire = require('proxyquire'),
    fsMock = {},
    pathMock = {},
    fileMock,
    service = proxyquire("../lib/fileService", {
      'fs': fsMock,
      'path': pathMock
    }),
    testOutputDir = "mytestdir",
    testOutputFileName = "myTestFileName",
    testOutputFile = testOutputDir + "/" + testOutputFileName;

  fsMock.mkdirSync = jasmine.createSpy();

  fileMock = {
    on: jasmine.createSpy(),
    write: jasmine.createSpy(),
    end: jasmine.createSpy()
  };

  fsMock.createWriteStream = jasmine.createSpy().andReturn(fileMock);
  pathMock.dirname = jasmine.createSpy().andReturn(testOutputDir);

  describe("when output directory exists", function() {
    beforeEach(function() {
      fsMock.existsSync = jasmine.createSpy().andReturn(true);
      service.write([], testOutputFile);
    });

    it("should get directory from filename", function() {
      expect(pathMock.dirname).toHaveBeenCalledWith(testOutputFile)
    });

    it("should check output directory exists", function() {
      expect(fsMock.existsSync).toHaveBeenCalledWith(testOutputDir);
    });

    it("should not create directory", function() {
      expect(fsMock.mkdirSync).not.toHaveBeenCalled();
    });
  });

  describe("when output directory does not exist", function() {

    var testData = ["line1", "line2"];

    beforeEach(function() {
      fsMock.existsSync = jasmine.createSpy().andReturn(false);
      service.write(testData);
    });

    it("should create directory", function() {
      expect(fsMock.mkdirSync).toHaveBeenCalledWith(testOutputDir);
    });

    it("should create output file stream", function() {
      expect(fsMock.createWriteStream).toHaveBeenCalledWith(testOutputFile);
    });


    it("should call file.on", function() {
      expect(fileMock.end).toHaveBeenCalled();
    });

    describe("when array of data is provided", function() {

      it("should write data to file", function() {
        expect(fileMock.write).toHaveBeenCalledWith(testData[0] + '\n');
      });

      it("should write data to file", function() {
        expect(fileMock.write).toHaveBeenCalledWith(testData[1] + '\n');
      });
    });

    it("should call file.end", function() {
      expect(fileMock.end).toHaveBeenCalled();
    });

  });

});
