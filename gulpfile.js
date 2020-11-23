"use strict";

// Gulp
const {src, dest} = require("gulp");
const gulp = require("gulp");

// Common
const browsersync = require("browser-sync").create();
const plumber = require("gulp-plumber");
const rigger = require("gulp-rigger");
const del = require("del");
const rename = require("gulp-rename");

// CSS
const sass = require("gulp-sass");
// + normalize css in sass pipe
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const cssnano = require("gulp-cssnano");
const removeComments = require('gulp-strip-css-comments');

// JS
let uglify = require('gulp-uglify-es').default;

// Img
const imagemin = require("gulp-imagemin");

/* Paths */
let path = {
    build: {
        html: "dest/",
        js: "dest/js/",
        css: "dest/css/",
        images: "dest/img/"
    },
    src: {
        html: "src/*.html",
        js: "src/js/*.js",
        css: "src/sass/style.scss",
        images: "src/img/**/*.{jpg,png,svg,gif,ico,webmanifest,xml}"
    },
    watch: {
        html: "src/**/*.html",
        js: "src/js/**/*.js",
        css: "src/sass/**/*.scss",
        images: "src/img/**/*.{jpg,png,svg,gif,ico,webmanifest,xml}"
    },
    clean: "./dest"
}


/* Tasks */
function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./dest/"
        },
        port: 3000
    });
}

function browserSyncReload() {
    browsersync.reload();
}

function html() {
    return src(path.src.html, { base: "src/" })
        .pipe(plumber())
        .pipe(rigger())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css, { base: "src/sass/" })
        .pipe(plumber())
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(autoprefixer({
            Browserslist: ['last 8 versions'],
            cascade: true
        }))
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js, {base: './src/js/'})
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    return src(path.src.images)
        .pipe(imagemin())
        .pipe(dest(path.build.images));
}

function clean() {
    return del(path.clean);
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.images], images);
}


const build = gulp.series(clean, gulp.parallel(html, css, js, images));
const watch = gulp.parallel(build, watchFiles, browserSync);


/* Exports Tasks */
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;


















