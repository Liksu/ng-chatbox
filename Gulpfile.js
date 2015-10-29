var gulp = require('gulp');
var babel = require('gulp-babel');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var gulpif = require('gulp-if');
var ngAnnotate = require('gulp-ng-annotate');
var header = require('gulp-header');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var css2js = require('gulp-css-to-js');
var clean = require('gulp-clean');
//var jade = require('gulp-jade');
//var gutil = require('gulp-util');
//var debug = require('gulp-debug');


var pkg = {pkg: require('./package.json')};
var banner = ['/**',
	' * <%= pkg.name %> - <%= pkg.description %>',
	' * @version v<%= pkg.version %>',
	' * @link <%= pkg.homepage %>',
	' * @license <%= pkg.license %>',
	' */',
	''].join('\n');

gulp.task('clean', function () {
	return gulp.src('build', {read: false})
		.pipe(clean());
});

gulp.task('default', ['clean'], function () {
	return gulp.src(['src/*.*'])
		.pipe(plumber())
		.pipe(gulpif(/\.js$/, babel()))
		.pipe(gulpif(/\.js$/, ngAnnotate()))
		.pipe(gulpif(/\.html$/, templateCache({root: '/', module: 'ngChatbox'})))
		.pipe(gulpif(/\.s?css$/, sass().on('error', sass.logError)))
		.pipe(gulpif(/\.s?css$/, css2js()))
		.pipe(concat('chatbox.js', {newLine: '\n\n'}))
		.pipe(header(banner, pkg))
		.pipe(gulp.dest('build'))
		.pipe(uglify({
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		}))
		.pipe(rename({suffix: '.min'}))
		.pipe(header(banner, pkg))
		.pipe(gulp.dest('build'))
});

gulp.task('server', ['default'], function(cb) {
	gulp.watch(['src/*.*', 'sample/*.*'], ['default']);

	require('gulp-connect').server({
		host: 'localhost',
		port: 4242,
		fallback: 'sample/index.html'
	});
	cb();
});