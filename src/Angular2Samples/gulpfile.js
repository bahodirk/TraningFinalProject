var gulp = require('gulp');
var rimraf = require('rimraf');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var chmod = require('gulp-chmod');
var liveServer = require('live-server');
// var tslint = require('gulp-tslint');
var tsProject = ts.createProject('./scripts/tsconfig.json');


var paths = {
  npm: './node_modules/',
  lib: './wwwroot/lib',
  app: './wwwroot/app',
  assets: './wwwroot/assets'
};

var htmlFiles = [
    './wwwroot/app/**/*.html'
];

var tsFiles = [
  '/wwwroot/app/**/*.ts'
]
var params = {

  port: 54268,
  host: "localhost",
  root: '/wwwroot',
  file: "index.html",
  wait: 1000

};

var config = {
  htmlFiles: htmlFiles,
  tsFiles: tsFiles,
  liveServer: liveServer
};

// libs to be copied
var libs = [
  paths.npm + '@angular/**/*.js',
  paths.npm + 'es6-shim/es6-shim.js',
  paths.npm + 'systemjs/dist/*.*',
  paths.npm + 'es6-promise/dist/es6-promise.js',
  paths.npm + 'rxjs/**/*.js',
  paths.npm + 'underscore/underscore.js',
  paths.npm + 'systemjs/dist/*.js',
  paths.npm + 'core-js/client/*.js',
  paths.npm + 'reflect-metadata/reflect.js',
  paths.npm + 'zone.js/dist/*.js'
];


/*clean tasks*/
gulp.task('clean-lib', function (callback) {
  rimraf(paths.lib, callback);
});

gulp.task('clean-app', function (callback) {
  rimraf(paths.app, callback);
});

gulp.task('clean',['clean-lib', 'clean-app']);

/*compiling ts files*/
gulp.task('compile',['clean'], () => {
  var tsResult = gulp.src('scripts/app/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));
  return tsResult.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.app));
});

/*Copy all resources that are not TypeScript to wwwroot*/
gulp.task("resources", ['compile'], () => {
  return gulp.src(["scripts/app/**/*", "!**/*.ts"])
      .pipe(gulp.dest(paths.app))
});

/*Copy required libs*/
gulp.task('libs',['resources'], function () {
  return gulp.src(libs).pipe(gulp.dest(paths.lib));
});

gulp.task('build', ['libs'], () => {
  console.log('Build in progress');
  // liveServer.start(params);
});

/*copy html files*/
gulp.task('views', function () {
  return gulp.src(config.htmlFiles)
    .pipe(chmod(755))
    .pipe(gulp.dest(paths.app))
});

/* #### Default task #### */
gulp.task('default', ['compile']);