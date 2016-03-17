var format = function (packageList) {

    var table = [];
    if (!packageList || packageList.length === 0) {
        table.push("No data.");
        return table;
    }

    table.push("| Package | Current | Latest | Status |");

    table.push("| :------ | ------: | -----: | :----: |");

    packageList.forEach(function (package) {
        package.status = "OUTDATED";

        if (package.version.current === package.version.new) {
            package.status = "OK";
        }

        table.push("| " + package.name + " | "
            + package.version.current + " | "
            + package.version.new + " | "
            + package.status + " |");
    });

    return table;
};

module.exports = {
        format: format
};
