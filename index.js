#!/usr/bin/env node
var ncu = require('npm-check-updates');
var packageParser = require('./packageParser');
var tableGenerator = require('./tableGenerator');
var fs = require('fs');

const OUTPUT_DIR = './ncu-report';
const OUTPUT_FILENAME = 'ncu-report.md';

var options = {
    packageFile: "package.json"
    // Any command-line option can be specified here.
    // These are set by default:
    // silent: true,
    // jsonUpgraded: true
};

var generateReport = function generateReport(conf) {
    ncu
        .run(conf)

        .then(function (upgraded) {
            var package = JSON.parse(fs.readFileSync(conf.packageFile, 'utf8'));

            var currentVersions = packageParser.parse(package.devDependencies, "current");
            var upgradedVersions = packageParser.parse(upgraded, "new");
            var mergedList = packageParser.merge(currentVersions, upgradedVersions);
            var tableData = tableGenerator.format(mergedList);

            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR);
            }
            var file = fs.createWriteStream(OUTPUT_DIR + '/' + OUTPUT_FILENAME);

            file.on('error', function (err) {
                throw err;
            });

            tableData.forEach(function (tableRow) {
                file.write(tableRow + '\n');
            });

            file.end();
            console.log("Report generated in " + OUTPUT_DIR + '/' + OUTPUT_FILENAME);
        });
};

generateReport(options);

module.exports = {
        generateReport: generateReport
};
