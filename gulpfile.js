// TODO create min files
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = {
    resources: ['src/*.html']
};

gulp.task('resources', function () {
    return gulp.src(paths.resources)
        .pipe(gulp.dest('dist'));
});

gulp.task('compile', function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .transform("babelify")
        .bundle()
        .pipe(source('bundle.js'))
       /* .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))*/
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('./src/**/*.ts', ['compile']);
    gulp.watch(paths.resources, ['resources']);
});

gulp.task('build', ['resources', 'compile']);
gulp.task('default', ['compile', 'watch']);