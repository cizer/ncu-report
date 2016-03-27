var packageParser = require('./packageParser');
var tableGenerator = require('./tableGenerator');
var fileService = require('./fileService');
var fs = require('fs');

var generate = function (configuration, upgraded) {

    var packageData = JSON.parse(fs.readFileSync(configuration.packageFile, 'utf8'));
    
    var devDependencies = packageParser.parse(packageData.devDependencies, "current");
    var dependencies = packageParser.parse(packageData.dependencies, "current");
    var upgradedVersions = packageParser.parse(upgraded, "new");
    
    var allDependencies = dependencies.concat(devDependencies);
    var mergedList = packageParser.merge(allDependencies, upgradedVersions);
    
    var tableData = tableGenerator.format(mergedList);
    tableData.push('<sup><sub>Report generated on: ' + Date() + '<sub><sup>');

    fileService.write(tableData);
};

module.exports = {
    generate: generate
};