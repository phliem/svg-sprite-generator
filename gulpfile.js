var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
var del = require('del');   // to delete folders & files

/**
 * Compress each svg files with svgmin and merge them into a spritesheet
 */
gulp.task('svgstore', function () {
    return gulp
        .src(['app/icons/*.svg']) //Source folder where to find your svg
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            };
        }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(gulp.dest('dist/icons/spritesheet')); //Destination folder where to find your compressed svg
});

/**
 * Compress each svg files with svgmin
 */
gulp.task('svgmin', function () {
    return gulp.src('app/icons/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('dist/icons/compressed'));
});

/**
 * Delete the dist folder to have a clean generation of svgs
 */
gulp.task('clean', function() {
    return del.sync('dist');
});
