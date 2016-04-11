#!/usr/bin/env node

var ncu = require('npm-check-updates');
var vm = require('npm-check-updates/lib/versionmanager');
var program = require('commander');
var reportService = require('./reportService');

var vm = require('npm-check-updates/lib/versionmanager');


program
  .version('0.0.8')
  .option('-m, --packageManager <name>', 'npm (default) | bower', 'npm')
  .option('-o --outputFile <filename>', '.\/ncu-report\/ncu-report.md (default)', './ncu-report/ncu-report.md')
  .option('-v --verbose', 'verbose')
  .parse(process.argv);

var packageFile = "package.json";

if (program.packageManager === 'bower') {
  packageFile = 'bower.json';
}

var options = {
  packageFile: packageFile,
  packageManager: program.packageManager,
  outputFile: program.outputFile
};

var generateReport = function generateReport(configuration, installedPackages) {
  ncu.run(configuration)
    .then(function(latestPackages) {
      if (program.verbose) {
        console.log("==== ncu raw data ====")
        console.log("configuration", configuration);
        console.log("latestPackages", latestPackages);
        console.log("installedPackages", installedPackages);
      }
      reportService.generate(configuration, latestPackages, installedPackages);
    });
};

vm.initialize(options).then(function(){
  vm.getInstalledPackages({packageManager: options.packageManager}).then(function(installedPackages){
    generateReport(options, installedPackages);
  });
});

module.exports = {
  generateReport: generateReport
};
