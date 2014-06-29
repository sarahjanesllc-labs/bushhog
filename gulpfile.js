var gulp = require('gulp'),
    nib = require('nib'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    nodemon = require('gulp-nodemon');

gulp.task('styles', function() {
    gulp.src('less/index.less')
        .pipe(less({compress: true}))
        .pipe(gulp.dest('static/css/'));
});

var vendorCSS = [
    "bower_components/bootswatch/flatly/bootstrap.min.css",
];

var vendorScripts = [
    "bower_components/jquery/**/jquery.min.js",
    "bower_components/bootstrap/**/**/bootstrap.min.js"
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
        ext: 'hbs less js',
        ignore: ['node_modules/', 'test/']
    })
        .on('change', ['styles'])
        .on('restart', function() {
            console.log('restarted');
        });
});

gulp.task('default', ['styles', 'concatCSS', 'concatJS']);
