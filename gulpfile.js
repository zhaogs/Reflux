/**
 * Created by Administrator on 2015/9/10.
 */

var gulp = require('gulp'),
    browserify = require('browserify'),
    del = require('del'),
    reactify = require('reactify'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    sass=require('gulp-sass'),
    reload=require('gulp-livereload'),
    rename=require('gulp-rename'),
    source=require('vinyl-source-stream');

//path
var PATHS = {
    sass: ['./static/css/*.scss'],
    //main: ['./static/ReactChat.js'],
    main: ['./static/Waterfall.js'],
    component: ['./static/component/*.js']
};

//clean
gulp.task('clean', function () {
    del(['build']);
})

//js(browserify����react���app.js)
gulp.task('bundle', function () {
    browserify(PATHS.main)
        .transform(reactify)
        .bundle()
        .pipe(source('waterfall.js'))
        .pipe(gulp.dest('./build/'))
})

//sass
gulp.task('sass', function () {
    gulp.src(PATHS.sass)
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./build/'))
        .pipe(minifycss())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./build/'));
})


//watch
gulp.task('watch',function(){
    gulp.watch(PATHS.component,['bundle']);
    gulp.watch(PATHS.sass,['sass']);
})

//default
gulp.task('default',['clean'],function(){
    gulp.start('watch','bundle','sass');
})
