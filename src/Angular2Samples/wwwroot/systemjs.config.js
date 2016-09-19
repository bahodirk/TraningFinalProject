/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  // map tells the System loader where to look for things
  var map = {
    'app': 'app',
    'rxjs': 'lib',
    '@angular': 'lib'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': { main: 'index.js', defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
  };

  var ngPackageNames = [
    'core',
    'common',
    'compiler',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router'
  ];
  ngPackageNames.forEach(function (pkgName) {
    map['@angular/' + pkgName] = 'lib/' + pkgName + '/bundles/' + pkgName + '.umd.js';
  });

  System.config({
    defaultJSExtensions: true,
    map: map,
    packages: packages
  });
})(this);
