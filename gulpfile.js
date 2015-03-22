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

var bundler = watchify(browserify({ entries: './jsx/app.jsx', debug: true } , watchify.args));
bundler.transform(reactify);

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('reload', function () {
  gulp.src(['./public/**/*.*', '!./public/**/*.js.map'])
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
      .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function () {
  gulp.watch(['./scss/**.scss'], ['scss']);
  gulp.watch(['./jsx/**/*.jsx'], ['build']);
  gulp.watch(['./public/**/*.*', '!./public/**/*.js.map'], ['reload']);
});


gulp.task('default', ['build', 'connect', 'watch']);
