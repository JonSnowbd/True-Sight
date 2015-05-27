var gulp = require('gulp'),
    prefixcss = require('gulp-autoprefixer'),
    ghpages = require('gulp-gh-pages'),
    imagemin = require('gulp-imagemin'),
    livereload = require('gulp-livereload'),
    minifycss = require('gulp-minify-css'),
    minifyjs = require('gulp-uglify'),
    clean = require('gulp-clean'),
    ncp = require('ncp');

var folder = {
    statics: "./app/static/**/*",
    js: "./app/js/*.js",
    css: "./app/css/*.css"
};

gulp.task('cleanDist', function(){
    console.log("-> Cleaning distribution folder.");
    return gulp.src('./dist/**/*')
        .pipe(clean());
});

gulp.task('css', function(){
    console.log("-> Compiling CSS");
    return gulp.src(folder.css)
        .pipe(prefixcss())
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function(){
    console.log("-> Compiling Javascript");
    return gulp.src(folder.js)
        .pipe(minifyjs())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('statics', function(){
    console.log("-> Moving static assets to Distribution");
    return gulp.src(folder.statics)
        .pipe(gulp.dest('./dist/static'));
});

gulp.task('libs', function(){
    console.log("-> Moving libraries to Distribution.");
    return gulp.src('./app/lib/**/*')
        .pipe(gulp.dest('./dist/lib'));
});

gulp.task('index', function(){
    gulp.src('./app/*.html')
        .pipe(gulp.dest('./dist'));
})

gulp.task('deploy', function(){
    gulp.src('./dist/**/*')
        .pipe(ghpages());
});

gulp.task('build', [
    'cleanDist',
    'css',
    'js',
    'statics',
    'libs',
    'index'
]);

gulp.task('default', ['build']);
