var packageParser = require('./packageParser');
var tableGenerator = require('./tableGenerator');
var fileService = require('./fileService');
var fs = require('fs');

var generate = function (configuration, upgraded) {

    var packageData = JSON.parse(fs.readFileSync(configuration.packageFile, 'utf8'));
    
    var dependencies = packageParser.parse(packageData.dependencies, "current");
    var devDependencies = packageParser.parse(packageData.devDependencies, "current");
    var upgradedVersions = packageParser.parse(upgraded, "new");
    
    var allDependencies = dependencies.concat(devDependencies);
    allDependencies = allDependencies.sort(compare);

    var mergedList = packageParser.merge(allDependencies, upgradedVersions);
    
    var tableData = tableGenerator.format(mergedList);
    tableData.push('<sup><sub>Report generated on: ' + Date() + '<sub><sup>');

    fileService.write(tableData);
};

function compare(a,b) {
    if (a.name < b.name)
        return -1;
    else if (a.name > b.name)
        return 1;
    else
        return 0;
}

module.exports = {
    generate: generate
};