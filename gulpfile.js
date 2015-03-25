var gulp       = require('gulp'),
    sass       = require('gulp-ruby-sass'),
    util       = require('gulp-util'),
    connect    = require('gulp-connect'),
    browserify = require('browserify'),
    reactify   = require('reactify'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    watchify   = require('watchify'),
    sourcemaps = require('gulp-sourcemaps');

function errorHandler (err) {
  util.log(util.colors.red('Error'), err.message);
  this.end();
}

var bundler = watchify(browserify({ entries: './assets/jsx/app.jsx', debug: true } , watchify.args));
bundler.transform(reactify);

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('reload', function () {
  gulp.src(['./**/*.*', '!./public/**/*.js.map'])
      .pipe(connect.reload());
});


gulp.task('scss',function(){
  return sass('scss', {
      style      : 'expand',
      require    : ['bourbon', 'neat']
    })
    .pipe(gulp.dest('./public/css'));
});

gulp.task('build', function () {
  bundler.bundle()
      .on('error', errorHandler)
      .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true  }))
        .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./assets/javascripts'));
});

gulp.task('watch', function () {
  gulp.watch(['./scss/**.scss'], ['scss']);
  gulp.watch(['./assets/jsx/*.jsx'], ['build']);
  gulp.watch(['./**/**/*.*', '!./assets/javascripts/*.js.map'], ['reload']);
});


gulp.task('default', ['build', 'connect', 'watch']);
