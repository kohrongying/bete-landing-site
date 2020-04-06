const gulp = require('gulp'),
  del = require('del'),
  browsersync = require('browser-sync').create(),
  cleanCSS  = require('gulp-clean-css'),
  htmlmin = require('gulp-htmlmin');

const BUILD_FOLDER = 'docs';

function css() {
  const postcss = require('gulp-postcss');
  return gulp
    .src('src/*.css')
    .pipe(postcss([
      require('tailwindcss'),
      cleanCSS
    ]))
    .pipe(gulp.dest(BUILD_FOLDER))
    .pipe(browsersync.stream());
}

function images() {
  return gulp 
    .src('src/assets/*')
    .pipe(gulp.dest(`${BUILD_FOLDER}/assets`))
    .pipe(browsersync.stream());
}

function html() {
  return gulp
    .src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(BUILD_FOLDER))
    .pipe(browsersync.stream());
}

async function clean() {
  return del([BUILD_FOLDER])
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: BUILD_FOLDER
    },
    port: 3000
  });
  done();
}


function watchFiles() {
  gulp.watch('src/*.css', css);
  gulp.watch('src/*.html', html);
}

const build = gulp.series(clean, images, html, css);
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// export tasks
exports.css = css;
exports.html = html;
exports.images = images;
exports.build = build;
exports.watch = watch;
exports.default = build;