var PackageParser = function () {
};

function getPackage(name) {
    return {
        name: name,
        version: {}
    };
}

PackageParser.prototype.parse = function (packages, versionType) {
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

PackageParser.prototype.merge = function (current, upgraded) {
    var mergedList = [];

    current.forEach(function(currentItem){
        var mergedItem = currentItem;

        upgraded.forEach(function(upgradedItem){
           if(upgradedItem.name === currentItem.name){
               mergedItem.version.new = upgradedItem.version.new;
           }
        });

        if(!mergedItem.version.new){
            mergedItem.version.new = mergedItem.version.current;
        }

        mergedList.push(mergedItem);
    });

    return mergedList;
};


module.exports = new PackageParser();