#!/usr/bin/env node

var ncu = require('npm-check-updates');
var program = require('commander');
var reportService = require('./reportService');


program
  .version('0.0.8')
  .option('-i --packageFile <filename>', 'package file name', 'package.json')
  .option('-o --outputFile <filename>', 'output file name', './ncu-report/ncu-report.md')
  .option('-v --verbose', 'verbose')
  .parse(process.argv);


var options = {
  packageFile: program.packageFile,
  outputFile: program.outputFile
};

var generateReport = function generateReport(configuration) {
  ncu.run(configuration)
    .then(function(upgraded) {
      if(program.verbose){
        console.log(upgraded);
      }
      reportService.generate(configuration, upgraded);
    });
};

generateReport(options);

module.exports = {
  generateReport: generateReport
};
