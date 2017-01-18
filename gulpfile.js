var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

gulp.task('scripts', function(){
  gulp.src(['src/app.route.js', 'src/components/*/*.*.js'])
  .pipe(concat('app.min.js'))
  .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('moveFiles', function(){
  gulp.src(['src/index.html'])
  .pipe(gulp.dest('./dist'));

  gulp.src('src/views/*.html')
  .pipe(gulp.dest('./dist/views'));
});

gulp.task('connect', function(){
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('build', ['moveFiles', 'scripts'], function(){
  gulp.watch(['src/index.html', 'src/views/*.html'], ['moveFiles']);
  gulp.watch(['src/app.route.js', 'src/components/*/*.*.js'], ['scripts']);
});
