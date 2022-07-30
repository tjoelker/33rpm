const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// compile scss -> css
function style() {
  return gulp.src('./scss/**/*.scss')        // 1: location of scss file(s) ("**" means parent and all sub folders)
    .pipe(sass().on('error', sass.logError)) // 2: pass the file(s) through the sass compiler
    .pipe(gulp.dest('./css'))                // 3: location where the css file should go
    .pipe(browserSync.stream());             // 4: stream changes to browser(s)
}

// synchronize new changes with browser output
function sync() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
  gulp.watch('./scss/**/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
}

exports.style = style;
exports.sync = sync;