var format = function(packageList) {

  var table = [];
  if (!packageList || packageList.length === 0) {
    table.push("No data.");
    return table;
  }

  table.push("| Package | Current | Installed | Latest | Status |");
  table.push("| :------ | ------: | --------: | -----: | :----: |");

  packageList.forEach(function(package) {
    package.status = "OUTDATED";
    if (!package.version.new || package.version.new === package.version.installed) {
      package.status = "OK";
      package.version.new = package.version.installed;
    }

    table.push("| " + package.name + " | " +
      package.version.current + " | " +
      package.version.installed + " | " +
      package.version.new + " | " +
      package.status + " |");

  });

  return table;
};

module.exports = {
  format: format
};
