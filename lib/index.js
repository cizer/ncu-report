#!/usr/bin/env node

var ncu = require('npm-check-updates');
var reportService = require('./reportService');

var options = {
    packageFile: "package.json" //,
        // prod: true
        // Any command-line option can be specified here.
        // These are set by default:
        // silent: true,
        // jsonUpgraded: true
};

var generateReport = function generateReport(configuration) {

    ncu.run(configuration)
        .then(function (upgraded) {
            reportService.generate(configuration, upgraded);
        });
};

generateReport(options);

module.exports = {
    generateReport: generateReport
};