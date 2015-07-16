var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
		livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var pngquant = require('imagemin-pngquant');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var gulp = require('gulp'),
  	connect = require('gulp-connect');

gulp.task('styles', function(){
  gulp.src(['sass/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(gulp.dest('css/'))
});

gulp.task('default', function(){
  gulp.watch("sass/*.scss", ['styles']);
});

gulp.task('server', function() {
  connect.server({
    port: 8888
  });
});
