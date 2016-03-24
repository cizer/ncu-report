#!javascript

var proxyquire = require('proxyquire').noCallThru;

var ncuCalled = {
    run: {
        wasCalled: false
    }
}
var ncuStub = {
    'run': function (conf) {
        console.log("in run");
        ncuCalled.run.wasCalled = true;
        return conf;
    }
};

var index = proxyquire("../lib/index", {
    'ncu': ncuStub
});

describe("test program flow", function () {
    var testOptions = "TEST OPTIONS";

    it("placeholder until i work out require mocking", function () {
        expect(true).toBe(true);
    });

    xit("test ncu", function () {
        console.log("test hahappppppp");
        index.generateReport(testOptions);
        expect(ncuCalled.run.wasCalled).toBeTruthy();
    });
});