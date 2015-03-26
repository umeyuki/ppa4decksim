var gulp       = require('gulp'),
    sass       = require('gulp-ruby-sass'),
    util       = require('gulp-util'),
    connect    = require('gulp-connect'),
    browserify = require('browserify'),
    reactify   = require('reactify'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    watchify   = require('watchify'),
    sourcemaps = require('gulp-sourcemaps'),
    slim       = require("gulp-slim"),
    concat     = require('gulp-concat'),
    ghPages = require('gulp-gh-pages');

function errorHandler (err) {
  util.log(util.colors.red('Error'), err.message);
  this.end();
}

gulp.task('slim', function(){
  gulp.src("./src/slim/*.slim")
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest("./dist/"));
});

gulp.task('scss',function(){
  return sass('src/scss', {
      style      : 'expand'
    })
    .pipe(gulp.dest('./src/css'));
});

gulp.task('concat', function() {
  return gulp.src(
    [
      './src/css/main.css',
      './bower_components/pure/pure-min.css',
      './bower_components/pure-extras/css/pure-extras.css'
    ]
  )
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./dist/assets/stylesheets'));
});

gulp.task('connect', function() {
  connect.server({
    root: './dist',
    livereload: true
  });
});

var bundler = watchify(browserify({ entries: './src/jsx/app.jsx', debug: true } , watchify.args));
bundler.transform(reactify);

gulp.task('reload', function () {
  gulp.src(['./src/**/*.*', '!./src/**/*.js.map'])
      .pipe(connect.reload());
});

gulp.task('build', function () {
  bundler.bundle()
      .on('error', errorHandler)
      .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true  }))
        .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/assets/javascripts'));
});


gulp.task('watch', function () {
  gulp.watch(['./src/slim/**.slim'], ['slim']);
  gulp.watch(['./src/scss/**.scss'], ['scss', 'concat']);
  gulp.watch(['./src/jsx/*.jsx'], ['build']);
  gulp.watch(['./src/**/*.*', '!./src/js/*.js.map'], ['reload']);
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['build', 'connect', 'watch']);
