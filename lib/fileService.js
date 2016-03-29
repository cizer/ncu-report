(function () {
    'use strict';

    var fs = require('fs');
    var path = require('path');

    var write = function (data, outputFile) {

        var outputDirectory = path.dirname(outputFile);

        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory);
        }
        var file = fs.createWriteStream(outputFile);

        file.on('error', function (err) {
            throw err;
        });

        data.forEach(function (tableRow) {
            file.write(tableRow + '\n');
        });

        file.end();
    };

    module.exports = {
        write: write
    };
}());
