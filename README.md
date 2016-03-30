[![npm stable version](https://img.shields.io/npm/v/ncu-report.svg?label=npm)](https://npmjs.org/package/ncu-report)
[![Build Status](https://travis-ci.org/cizer/ncu-report.svg?branch=master)](https://travis-ci.org/cizer/ncu-report)

# ncu-report
A report generator that produces a table showing which packages require updating. The report is generated in markdown format and can be integrated into your build.

This tool uses the output of the [npm-check-updates](https://github.com/tjunnone/npm-check-updates) project

## Installation
```
npm install -g ncu-report
```

## Basic Usage
ncu-report looks for the package.json file in the current directory.
Report is generated in the default output location ./ncu-report/ncu-report.md
```
$ ncu-report
```

To specify input file e.g. bower dependencies.
````
$ ncu-report -i bower.json
````

## Usage
````
Usage: ncu-report [options]

Options:
    -h, --help                   output usage information
    -V, --version                output the version number
    -i --packageFile <filename>  package file name
    -o --outputFile <filename>   output file name
````

Example Output
--------------
| Package | Current | Latest | Status |
| :------ | ------: | -----: | :----: |
| bluebird | ^3.0.5 | ^3.3.4 | OUTDATED |
| chai | ^3.4.1 | ^3.5.0 | OUTDATED |
| chai-as-promised | ^5.1.0 | ^5.3.0 | OUTDATED |
| chai-string | ^1.1.4 | ^1.2.0 | OUTDATED |
| chalk | ^1.1.1 | ^1.1.3 | OUTDATED |
| cint | ^8.2.1 | - | NO DATA |
| cli-table | ^0.3.1 | - | NO DATA |
| commander | ^2.9.0 | - | NO DATA |
| eslint | ^1.9.0 | ^2.5.3 | OUTDATED |
| fast-diff | ^1.0.1 | - | NO DATA |
| find-up | ^1.1.0 | ^1.1.2 | OUTDATED |
| get-stdin | ^5.0.1 | - | NO DATA |
| json-parse-helpfulerror | ^1.0.3 | - | NO DATA |
| lodash | ^3.10.1 | ^4.6.1 | OUTDATED |
| mocha | ^2.3.4 | ^2.4.5 | OUTDATED |
| node-alias | ^1.0.3 | ^1.0.4 | OUTDATED |
| npm | ^3.5.1 | ^3.8.3 | OUTDATED |
| npmi | ^1.0.1 | - | NO DATA |
| require-dir | ^0.3.0 | - | NO DATA |
| semver | ^5.1.0 | - | NO DATA |
| semver-utils | ^1.1.1 | - | NO DATA |
| should | ^7.1.1 | ^8.3.0 | OUTDATED |
| spawn-please | ^0.1.0 | - | NO DATA |
| update-notifier | ^0.5.0 | ^0.6.3 | OUTDATED |
<sup><sub>Report generated on: Wed Mar 30 2016 20:26:40 GMT+0100 (BST)<sub><sup>
