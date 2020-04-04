const gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  minifyCSS = require('gulp-cssmin'),
  minifyHTML = require('gulp-minify-html');

function css() {
  const postcss = require('gulp-postcss');
  return gulp
    .src('src/*.css') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(postcss([
      // ...
      require('tailwindcss'),
      minifyCSS
    ]))
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.stream());
}

function html() {
  return gulp
    .src('src/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.stream());
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function watchFiles() {
  gulp.watch('src/*.css', css);
  gulp.watch('src/*.html', html);
}

const build = gulp.series(html, css);
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = build;