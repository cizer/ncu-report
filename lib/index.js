#!/usr/bin/env node

var ncu = require('npm-check-updates');
var program = require('commander');
var reportService = require('./reportService');


program
  .version('0.0.8')
  .option('-i --inputFile <filename>', 'package.json (default)', 'package.json')
  .option('-m, --packageManager <name>', 'npm (default) | bower', 'npm')
  .option('-o --outputFile <filename>', '.\/ncu-report\/ncu-report.md (default)', './ncu-report/ncu-report.md')
  .option('-v --verbose', 'verbose')
  .parse(process.argv);

var packageFile = "package.json";

if (program.packageManager === 'bower') {
  packageFile = 'bower.json';
}

if (program.packageFile) {
  packageFile = program.packageFile;
}

var options = {
  packageFile: packageFile,
  packageManager: program.packageManager,
  outputFile: program.outputFile
};

var generateReport = function generateReport(configuration) {
  ncu.run(configuration)
    .then(function(upgraded) {
      if (program.verbose) {
        console.log("==== ncu raw data ====")
        console.log(upgraded);
      }
      reportService.generate(configuration, upgraded);
    });
};

generateReport(options);

module.exports = {
  generateReport: generateReport
};
