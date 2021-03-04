const entryPath = ".";
const gulp = require("gulp");
const sass = require('gulp-sass');
sass.compiler = require('sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
gulpfile.js


const browserSync = require('browser-sync').create();

function compileSass(done) {
    gulp.src(entryPath + "/scss/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(entryPath + '/css'));
    done();
}

browserSync.init({
    server: "./" + entryPath
});

function reload(done) {
    browserSync.reload();
    done();
}

function watcher() {
    gulp.watch(entryPath + '/scss/**/*.scss', gulp.series(compileSass, reload));
    gulp.watch(entryPath + '/*.html', gulp.series(reload));
}
exports.compileSass = compileSass;
exports.default = gulp.series(compileSass, watcher);
