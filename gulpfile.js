var gulp = require('gulp'),
    nib = require('nib'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    nodemon = require('gulp-nodemon');

gulp.task('styles', function() {
    gulp.src('stylus/index.styl')
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest('static/css/'));
});

gulp.task('develop', function() {
    process.env.NODE_ENV = 'dev';
    nodemon({ script: 'server.js', ext: 'hbs styl js', ignore: ['node_modules/', 'test/']})
    .on('change', ['styles'])
    .on('restart', function() {
        console.log('restarted');
    });
});

gulp.task('default', ['styles']);
