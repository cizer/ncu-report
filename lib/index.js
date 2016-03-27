#!/usr/bin/env node

var ncu = require('npm-check-updates');
var program = require('commander');
var reportService = require('./reportService');


program
    .version('0.0.6')
    .option('-i --packageFile <filename>', 'package file name', 'package.json')
    .parse(process.argv);


var options = {
    packageFile: program.packageFile
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