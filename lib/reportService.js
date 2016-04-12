var packageParser = require('./packageParser');
var tableGenerator = require('./tableGenerator');
var fileService = require('./fileService');
var fs = require('fs');

var generate = function(configuration, latestPackages, installedPackages) {
  var packageData = JSON.parse(fs.readFileSync(configuration.packageFile, 'utf8'));
  var dependencies = packageParser.parse(packageData.dependencies, "current");
  var devDependencies = packageParser.parse(packageData.devDependencies, "current");
  var allDependencies = dependencies.concat(devDependencies);
  allDependencies = allDependencies.sort(compare);

  var installedVersions = packageParser.parse(installedPackages, "installed");
  var mergedInstalledList = packageParser
    .merge(allDependencies, installedVersions, 'name', 'installed');

  var upgradedVersions = packageParser.parse(latestPackages, "new");
  var mergedList = packageParser
    .merge(mergedInstalledList, upgradedVersions, 'name', 'new');

  var tableData = tableGenerator.format(mergedList, configuration.format);

  fileService.write(tableData, configuration.outputFile);

  return tableData;
};

function compare(a, b) {
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
