(function () {
    'use strict';

    var fs = require('fs');

    const OUTPUT_DIR = './ncu-report';
    const OUTPUT_FILENAME = 'ncu-report.md';

    var write = function (data) {

        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        var file = fs.createWriteStream(OUTPUT_DIR + '/' + OUTPUT_FILENAME);

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