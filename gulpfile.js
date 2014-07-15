var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    nodemon = require('gulp-nodemon');

gulp.task('styles', function() {
    gulp.src('style/**')
        .pipe(stylus())
        .pipe(gulp.dest('static/css/'));
});

var vendorCSS = [
    "bower_components/fontawesome/css/font-awesome.min.css",
];

var vendorScripts = [
    "bower_components/jquery/**/jquery.min.js",
    "bower_components/react/react-with-addons.min.js"
];

gulp.task('concatCSS', function() {
    gulp.src(vendorCSS)
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('static/css/'));
});

gulp.task('concatJS', function() {
    gulp.src(vendorScripts)
        .pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('static/js/'));
});

gulp.task('develop', function() {
    process.env.NODE_ENV = 'dev';
    nodemon({
        script: 'server.js',
        ext: 'jade less js',
        ignore: ['node_modules/', 'test/']
    })
        .on('change', ['styles'])
        .on('restart', function() {
            console.log('restarted');
        });
});

gulp.task('default', ['styles', 'concatCSS', 'concatJS']);
