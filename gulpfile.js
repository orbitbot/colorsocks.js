var gulp = require('gulp');
var lazypipe = require('lazypipe');
var browserSync = require("browser-sync");

// plugins
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var paths = {
  js: 'src/colorsocks.js'
};

var jsHint = lazypipe()
  .pipe(jshint)
  .pipe(jshint.reporter, 'jshint-stylish');

var minify = lazypipe()
  .pipe(uglify);


gulp.task('jshint', function() {
  gulp.src(paths.js).pipe(jsHint());
});

gulp.task('minify', function() {
  return gulp.src(paths.js)
    .pipe(jsHint())
    .pipe(minify());
});

gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: 'example'
    },
    port: '8080',
    logConnections: true,
    open: false,
    files: 'example/**'
  });
});

gulp.task('build', function() {
  gulp.src(paths.js)
    .pipe(gulp.dest('dist/'))
    .pipe(gulp.dest('example/js'))
    .pipe(minify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/'));
});
gulp.task('develop', ['jshint', 'server']);

gulp.task('exposition', ['server'], function() {
  setInterval(function() {
    browserSync.reload();
  }, 6000);
});