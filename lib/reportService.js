var packageParser = require('./packageParser');
var tableGenerator = require('./tableGenerator');
var fileService = require('./fileService');
var fs = require('fs');

var generate = function (configuration, upgraded) {
    var packageData = JSON.parse(fs.readFileSync(configuration.packageFile, 'utf8')),

        devDependencies = packageParser.parse(packageData.devDependencies, "current"),
        dependencies = packageParser.parse(packageData.dependencies, "current"),
        allDependencies = dependencies.concat(devDependencies),

        upgradedVersions = packageParser.parse(upgraded, "new"),

        mergedList = packageParser.merge(allDependencies, upgradedVersions),

        tableData = tableGenerator.format(mergedList);

    tableData.push('<sup><sub>Report generated on: ' + Date() + '<sub><sup>');

    fileService.write(tableData);
};

module.exports = {
    generate: generate
};