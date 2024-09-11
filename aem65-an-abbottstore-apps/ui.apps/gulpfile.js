// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const slang = require('gulp-slang');
// const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');

// Path Constants
const root          = 'src/main/content/jcr_root/apps/abbott/';
// const components    = root + 'components/';
// const clientLibs    = root + 'clientlibs/';
const cssPath       = root + '**/*.css';
const sassPath      = root + '**/*.scss';
// const mainCss     = sassPath + '*.scss';
// const cssBuild    = cssPath + '*.css';
// const cssSrcMaps  = clientLibs + '**/*.css.map';

// const jsPath      = designs + 'js/';
// const vendorPath  = designs + 'vendor/';

// imgPath     = designs + 'img/'

/**
 * Helper: changeNotification
 * Logs an event to the console.
 *
 * @param {String} fType - The file type that was changed.
 * @param {String} eType - The event that occured.
 * @param {String} msg - Short description of the actions that are being taken.
 */

function changeNotification(fType, eType, msg) {
    gutil.log(gutil.colors.cyan.bold(fType), 'was', gutil.colors.yellow.bold(eType) + '.', msg);
}

/**
 * Task: `sassBuild`
 * Compiles the sass and writes sourcemaps.
 */
function sassBuild() {
    return src(sassPath, {base: '.'})
        .pipe(plumber()) // Prevents pipe breaking due to error (for watch task)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass({
            outputStyle: 'compressed',
            omitSourceMapUrl: true, // Hardcoded in main.scss due to resource path issues
            //includePaths: [sassPath, components]
        }).on('error', sass.logError)) // compile SCSS to CSS and send error to sass logger on error.
        .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.', {
            addComment: false
        })) // write sourcemaps file in current directory
        .pipe(plumber.stop())
        .pipe(dest('.')
        // .pipe(rename(cssPath))
    ); // put final CSS in dist folder
}

/**
 * Task: `sass:sling`
 * Slings the compiled stylesheet and sourcemaps to AEM.
 */
function sassSling() {
    return src(cssPath)
        .pipe(slang());
}

// jsBuild task: concatenates and uglifies JS files to script.js
function jsBuild() {
    return src([
        jsPath
        //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('dist')
    );
}

// Cachebust
// , {allowEmpty: true}
var cbString = new Date().getTime();
function cacheBustTask(){
    return src(['index.html'], {allowEmpty: true})
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('.'));
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
    watch([sassPath],
        // parallel(sassBuild, jsBuild));

        parallel(sassBuild));
}

// Export the sassBuild task
exports.buildSASS = series(sassBuild, sassSling);
// exports.buildSASS = series(sassBuild);
// exports.sling = series(sassSling);

//Export the jsBuild task
exports.jsBuild = series(jsBuild);

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
// exports.default = series(
//     parallel(sassBuild, sassSling, jsBuild),
//     cacheBustTask,
//     watchTask
// );
exports.default = series(
    parallel(sassBuild, sassSling),
    cacheBustTask
);

exports.dev = series(
    parallel(sassBuild, sassSling),
    cacheBustTask,
    watchTask
);
