var dateformat = require('dateformat');

var format = function(packageList, format) {

    var table = [];
    if (!packageList || packageList.length === 0) {
        table.push("No data.");
        return table;
    }

    switch (format) {
        case 'dokuwiki':
            return formatDokuWiki(packageList);
        default: //markdown
            return formatMarkdown(packageList);
    }

}

function formatMarkdown(packageList) {

    var table = [];
    table.push("| Package | Current | Installed | Latest | Status |");
    table.push("| :------ | ------: | --------: | -----: | :----: |");

    packageList.forEach(function(package) {
        package.status = "OUTDATED";
        if (isLatestPackage(package.version.installed, package.version.new)) {
            package.status = "OK";
            package.version.new = package.version.current;
        }

        table.push("| " + package.name + " | " +
            package.version.current + " | " +
            package.version.installed + " | " +
            package.version.new + " | " +
            package.status + " |");

    });
    table.push('<sup><sub>Report generated on: ' + Date() + '<sub><sup>');
    return table;
}

function formatDokuWiki(packageList) {

    var table = [];
    table.push("| Package ^ Current ^ Installed ^ Latest ^ Status ^");

    packageList.forEach(function(package) {
        var installedColor;
        package.status = "OUTDATED";
        if (isLatestPackage(package.version.installed, package.version.new)) {
            package.status = "OK";
            installedColor = '@green:';
            package.version.new = package.version.current;
        } else if (isMajorUpdate(package.version.installed, package.version.new)) {
            installedColor = '@red:';
        } else {
            installedColor = '@orange:';
        }

        table.push("^ " + escapeCarat(package.name + " | " +
            package.version.current + " | " +
            installedColor + package.version.installed + " | " +
            package.version.new + " | " + package.status + " |"));

    });

    table.push('^ Report generated on: ' + Date() + '|||||');

    return table;

};

function isLatestPackage(installedVersion, newVersion) {
    return !newVersion || newVersion === installedVersion;
}

function escapeCarat(version) {
    return version.toString().replace(/\^/g, "%%^%%");
}

function isMajorUpdate(installedVersion, newVersion) {
    var installedMajorVersion = installedVersion.split('.')[0];
    var newMajorVersion = newVersion.split('.')[0];

    return (newMajorVersion > installedMajorVersion);
}

module.exports = {
    format: format
};
