#!/usr/bin/env node

var ncu = require('npm-check-updates');
var packageParser = require('./packageParser');
var tableGenerator = require('./tableGenerator');
var fileWriter = require('./fileWriter');
var fs = require('fs');

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

        fileWriter.write(tableData);
    });
};

generateReport(options);

module.exports = {
    generateReport: generateReport
};