var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
var del = require('del');   // to delete folders & files

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
        .pipe(gulp.dest('dist/icons')); //Destination folder where to find your compressed svg
});

gulp.task('clean', function() {
    return del.sync('dist');
});
