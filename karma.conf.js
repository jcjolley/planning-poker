// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    autoWatch: true,
    basePath: '',
    browsers: ['ChromeHeadless', 'ChromeDebug'],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        timeoutInterval: 10000,
      },
    },
    colors: true,
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './build/karma'),
      reports: ['html', 'json', 'text-summary'],
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: true,
    },
    customLaunchers: {
      ChromeDebug: {
        base: 'Chrome',
        chromeDataDir: require('path').join(__dirname, './build/.chrome'),
        flags: ['--auto-open-devtools-for-tabs'],
      },
    },
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    sonarQubeUnitReporter: {
      sonarQubeVersion: 'LATEST',
      outputFile: './build/karma/ut_report.xml',
      overrideTestDescription: true,
      testFilePattern: '.spec.ts',
      useBrowserName: false,
    },
    logLevel: config.LOG_INFO,
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-sonarqube-unit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    port: 9876,
    reporters: ['progress', 'sonarqubeUnit', 'coverage-istanbul'],
    singleRun: false,
  })
}
