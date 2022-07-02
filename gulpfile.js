// jshint esversion: 6
const { parallel } = require('gulp');
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var rename = require("gulp-rename");
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var gcmq = require('gulp-group-css-media-queries');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');

gulp.task('style', style);

function style(){
    return gulp.src('./app/precss/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(sourcemaps.init())
    .pipe(gcmq())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./app/css/'))
    .pipe(csso())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(browserSync.stream())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/css/'));
}

gulp.task('watch', function(){
    watch('./app/precss/style.scss', style);
    watch('./app/precss/style.scss', browserSync.reload);
    watch('./app/index.html', browserSync.reload);
});

gulp.task('sync', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('imagemin', function(){
    return gulp.src('./app/source-img/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('./app/img/'));
});

gulp.task('default', parallel(['style', 'watch', 'sync', 'imagemin']));