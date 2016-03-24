#!javascript

var proxyquire = require('proxyquire'),
    fsStub = {};

var service = proxyquire("../lib/fileService", {
    'fs': fsStub
});

ddescribe("write", function () {

    beforeEach(function () {
        fsStub.existsSync = function (dir) {
            console.log(dir);
            return true;
        };
        fsStub.createWriteStream = function () {
            return {
                on: function () {},
                end: function () {}
            };
        };
        service.write([]);
    });

    it("", function () {
        expect()
    });

});