ncu-report
==========
A report generator that produces a table showing which packages require updating. The report is generated in markdown format and can be integrated into your build.

Installation
------------
```sh
npm install -g ncu-report
```

Usage
-----
```sh
$ ncu-report
Report generated in ./ncu-report/ncu-report.md
```

Example Output
--------------
| Package | Current | Latest | Status |
| :------ | ------: | -----: | :----: |
| compass | 0.1.0 | 0.1.1 | OUTDATED |
| frisby | 0.8.5 | 0.8.5 | OK |
| grunt | 0.4.5 | 0.4.5 | OK |
| grunt-contrib-clean | 0.4.1 | 1.0.0 | OUTDATED |
| grunt-contrib-compass | 0.2.0 | 1.1.1 | OUTDATED |
| grunt-contrib-concat | 0.3.0 | 1.0.0 | OUTDATED |
| grunt-contrib-connect | 0.7.1 | 1.0.0 | OUTDATED |
| grunt-contrib-copy | 0.4.1 | 1.0.0 | OUTDATED |
| grunt-contrib-jshint | 0.5.4 | 1.0.0 | OUTDATED |
| grunt-contrib-uglify | 0.2.7 | 1.0.0 | OUTDATED |
| grunt-contrib-watch | 0.4.4 | 0.6.1 | OUTDATED |
| grunt-jasmine-node-new | 0.3.2 | 0.3.2 | OK |
| grunt-karma | 0.12.0 | 0.12.1 | OUTDATED |
| grunt-ng-annotate | 1.0.1 | 2.0.1 | OUTDATED |
| grunt-protractor-runner | 1.2.1 | 3.0.0 | OUTDATED |
| jasmine-reporters | 1.0.1 | 2.1.1 | OUTDATED |
| karma-chrome-launcher | ^0.2.0 | ^0.2.2 | OUTDATED |
| karma-coverage | 0.2.7 | 0.5.5 | OUTDATED |
| karma-jasmine | 0.1.6 | 0.3.7 | OUTDATED |
| karma-junit-reporter | 0.2.2 | 0.3.8 | OUTDATED |
| karma-ng-html2js-preprocessor | 0.1.2 | 0.2.1 | OUTDATED |
| karma-phantomjs-launcher | 1.0.0 | 1.0.0 | OK |
| node-promise | 0.5.12 | 0.5.12 | OK |
| node-rest-client | 1.4.4 | 1.8.0 | OUTDATED |
| phantomjs-prebuilt | 2.1.3 | 2.1.5 | OUTDATED |
| protractor-screenshot-reporter | 0.0.5 | 0.0.5 | OK |
| selenium-server-standalone-jar | 2.43.1 | 2.52.0 | OUTDATED |

