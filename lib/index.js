#!/usr/bin/env node

var ncu = require('npm-check-updates');
var vm = require('npm-check-updates/lib/versionmanager');
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

if (program.inputFile) {
  packageFile = program.inputFile;
}

var options = {
  packageFile: packageFile,
  packageManager: program.packageManager,
  outputFile: program.outputFile
};

console.log("configuration", options);
var generateReport = function generateReport(installedPackages) {
  ncu.run(options)
    .then(function(upgraded) {
      if (program.verbose) {
        console.log("==== ncu raw data ====")
        console.log(upgraded);
      }
      reportService.generate(options, upgraded, installedPackages);
    });
};

vm.initialize(options).then(function(){

  vm.getInstalledPackages({packageManager: options.packageManager}).then(function(installedPackages){
    console.log("installedPackages", installedPackages);

    generateReport(installedPackages);
  });
});

module.exports = {
  generateReport: generateReport
};
