var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

gulp.task('scripts', function(){
  gulp.src(['src/app.route.js', 'src/components/*/*.*.js'])
  .pipe(concat('app.min.js'))
  .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('styles', function(){
  gulp.src(['src/styles/*.css'])
  .pipe(concat('app.min.css'))
  .pipe(gulp.dest('./dist/styles'));
});

gulp.task('moveFiles', function(){
  gulp.src(['src/index.html'])
  .pipe(gulp.dest('./dist'));

  gulp.src('src/views/*.html')
  .pipe(gulp.dest('./dist/views'));

  gulp.src('src/images/*.*')
  .pipe(gulp.dest('./dist/images'));
});

gulp.task('build', ['moveFiles', 'scripts', 'styles'], function(){
  gulp.watch(['src/index.html', 'src/views/*.html'], ['moveFiles']);
  gulp.watch(['src/app.route.js', 'src/components/*/*.*.js'], ['scripts']);
  gulp.watch(['src/styles/*.css'], ['styles']);
});
