var gulp 		= require('gulp')
	pug 		= require('gulp-pug')
	livereload 	= require('gulp-livereload')
	connect 	= require('gulp-connect')
	compass 	= require('gulp-compass')
 	plumber 	= require('gulp-plumber')
  	babel 		= require("gulp-babel");

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});


gulp.task('pug', function() {
	gulp.src('./src/**/*.pug')
		.pipe(plumber({
	      errorHandler: function (error) {
	        console.log(error.message);
	        this.emit('end');
	    }}))
		.pipe(pug({
			pretty : true
		}))
		.pipe(plumber.stop())
		.pipe(gulp.dest('./dist'))
		.pipe(connect.reload());
});

gulp.task('compass', function() {
  	gulp.src('./assets/sass/*.sass')
  		.pipe(plumber({
	      errorHandler: function (error) {
	        console.log(error.message);
	        this.emit('end');
	    }}))
	    .pipe(compass({
	      config_file: './config.rb',
	      css: './assets/stylesheets',
	      sass: './assets/sass'
	    }))
	    .pipe(plumber.stop())
	    .pipe(gulp.dest('./assets/stylesheets'))
	    .pipe(connect.reload());
});
gulp.task("babel", function () {
  return gulp.src("src/app.js")
  	.pipe(plumber({
	      errorHandler: function (error) {
	        console.log(error.message);
	        this.emit('end');
	}}))
    .pipe(babel())
    .pipe(plumber.stop())
    .pipe(gulp.dest("dist"));
});

gulp.task('watch', function() {
	gulp.watch('./src/**/*.pug', ['pug','compass'])
	gulp.watch('./assets/sass/**/*.{sass,scss}', ['compass','pug'])
});

gulp.task('default', ['connect', 'pug' , 'compass' , 'watch']);