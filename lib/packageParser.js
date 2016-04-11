function getPackage(name) {
    return {
        name: name,
        version: {}
    };
}

var parse = function (packages, versionType) {
    var packageList = [];
    for (var key in packages) {
        var attrName = key;
        var attrValue = packages[key];
        var package = getPackage(attrName);
        package.version[versionType] = attrValue;
        packageList.push(package);
    }

    return packageList;
};

var merge = function (current, installed, match, property) {
    var mergedList = [];

    current.forEach(function (currentItem) {
        var mergedItem = currentItem;

        installed.forEach(function (installedItem) {
            if (installedItem[match] === mergedItem[match]) {
                mergedItem.version[property] = installedItem.version[property];
            }
        });

        mergedList.push(mergedItem);
    });

    return mergedList;
};

module.exports = {
    parse: parse,
    merge: merge
};
