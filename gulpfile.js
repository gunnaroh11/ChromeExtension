// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var handlebars = require('gulp-handlebars');
var defineModule = require('gulp-define-module');
var declare = require('gulp-declare');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('Scripts/GetData.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

// // Compile Our Sass
// gulp.task('sass', function() {
//     return gulp.src('scss/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('CSS'))
//         .pipe(rename('inpersoned.min.css'))
//         .pipe(minifyCSS())
//         .pipe(gulp.dest('CSS'));
// });

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['Scripts/handlebars.runtime-v1.3.0.js','Scripts/templates/templates.js','Scripts/GetData.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('Scripts'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('Scripts'));
});

// Create handlebars template
gulp.task('templates', function(){
  gulp.src(['Scripts/templates/*.handlebars'])
    .pipe(handlebars())
    .pipe(defineModule('plain'))
    .pipe(declare({
      namespace: 'Templates'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('Scripts/templates/'));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('Scripts/GetData.js', ['lint', 'scripts']);
    //gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('Scripts/templates/*.handlebars', ['templates']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'templates', 'watch']);