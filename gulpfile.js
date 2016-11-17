/* globals require, console*/
'use strict';
var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('script', function () {
	return gulp.src('src/app.jsx')
	.pipe(babel({
		presets: ['react']
	}))
	.on('error', swallowError)
	.pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
	gulp.watch('src/**/*.jsx', ['script']);
});

function swallowError (error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('default', ['script', 'watch']);