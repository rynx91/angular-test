// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-scss-preprocessor')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/angular-test'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
    files: [
      { pattern: '../node_modules/@angular/material/prebuilt-themes/indigo-pink.css', watched: true,  included: true, served: true },
      { pattern: './src/styles.scss', watched: true,  included: true, served: true },
      { pattern: './src/app/app.component.scss', watched: true,  included: true, served: true },
      { pattern: './src/app/shared/snackbar/snackbar.component.scss', watched: true,  included: true, served: true }
    ],
    preprocessors: {
      './src/styles.scss': ['scss'],
      './src/app/app.component.scss': ['scss'],
      './src/app/shared/snackbar/snackbar.component.scss': ['scss'],
    }
  });
};