[![npm stable version](https://img.shields.io/npm/v/ncu-report.svg?label=npm)](https://npmjs.org/package/ncu-report)
[![Build Status](https://travis-ci.org/cizer/ncu-report.svg?branch=master)](https://travis-ci.org/cizer/ncu-report)
[![Dependency Status](https://david-dm.org/cizer/ncu-report.svg)](https://david-dm.org/cizer/ncu-report)
[![devDependency Status](https://david-dm.org/cizer/ncu-report/dev-status.svg)](https://david-dm.org/cizer/ncu-report#info=devDependencies)

# ncu-report
A report generator that produces a table showing which packages require updating. The report is generated in markdown (and optionally dokuwiki) format and can be integrated into your build.

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

To use bower package manager
````
$ ncu-report -m bower
````

To output in dokuwiki format
````
$ ncu-report -f dokuwiki
````

To output to alternative filename
````
$ ncu-report -o myreport.md
````

## Usage
````
Usage: ncu-report [options]

Options:
  -h, --help                   output usage information
  -V, --version                output the version number
  -m, --packageManager <name>  npm (default) | bower
  -o, --outputFile <filename>   ./ncu-report/ncu-report.md (default)
  -f, --format <name>           markdown (default) | dokuwiki
  -v, --verbose                 verbose˜
````
## Output Column Definitions

| Column | Description |
| :----- | :---------- |
| Package | The name of the package |
| Current | The current version specified in package.json or bower.json |
| Installed | The locally installed version |
| Latest | The latest version available from the remote repository |
| Status | OK or OUTDATED |

## Example Output

| Package | Current | Installed | Latest | Status |
| :------ | ------: | --------: | -----: | :----: |
| bluebird | ^3.0.5 | 3.3.4 | ^3.3.5 | OUTDATED |
| chai | ^3.4.1 | 3.5.0 | ^3.5.0 | OUTDATED |
| chai-as-promised | ^5.1.0 | 5.3.0 | ^5.3.0 | OUTDATED |
| chai-string | ^1.1.4 | 1.2.0 | ^1.2.0 | OUTDATED |
| chalk | ^1.1.1 | 1.1.3 | ^1.1.3 | OUTDATED |
| cint | ^8.2.1 | 8.2.1 | ^8.2.1 | OK |
| cli-table | ^0.3.1 | 0.3.1 | ^0.3.1 | OK |
| commander | ^2.9.0 | 2.9.0 | ^2.9.0 | OK |
| eslint | ^1.9.0 | 1.10.3 | ^2.7.0 | OUTDATED |
| fast-diff | ^1.0.1 | 1.0.1 | ^1.0.1 | OK |
| find-up | ^1.1.0 | 1.1.2 | ^1.1.2 | OUTDATED |
| get-stdin | ^5.0.1 | 5.0.1 | ^5.0.1 | OK |
| json-parse-helpfulerror | ^1.0.3 | 1.0.3 | ^1.0.3 | OK |
| lodash | ^3.10.1 | 3.10.1 | ^4.10.0 | OUTDATED |
| mocha | ^2.3.4 | 2.4.5 | ^2.4.5 | OUTDATED |
| node-alias | ^1.0.3 | 1.0.4 | ^1.0.4 | OUTDATED |
| npm | ^3.5.1 | 3.8.5 | ^3.8.6 | OUTDATED |
| npmi | ^1.0.1 | 1.0.1 | ^1.0.1 | OK |
| require-dir | ^0.3.0 | 0.3.0 | ^0.3.0 | OK |
| semver | ^5.1.0 | 5.1.0 | ^5.1.0 | OK |
| semver-utils | ^1.1.1 | 1.1.1 | ^1.1.1 | OK |
| should | ^7.1.1 | 7.1.1 | ^8.3.0 | OUTDATED |
| spawn-please | ^0.1.0 | 0.1.0 | ^0.1.0 | OK |
| update-notifier | ^0.5.0 | 0.5.0 | ^0.6.3 | OUTDATED |
<sup><sub>Report generated on: Tue Apr 12 2016 23:49:37 GMT+0100 (BST)<sub><sup>
