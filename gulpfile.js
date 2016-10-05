var gulp       = require('gulp'),
    browserify = require('browserify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    source     = require('vinyl-source-stream');

gulp.task('browserify', function() {
    return browserify({ entries: ['resources/main.js'] })
        .bundle()
        .pipe(source('chat.js'))
        .pipe(gulp.dest('dist'));
});

// gulp.task('js', function() {
//     gulp.src(npmJsDeps)
//         .pipe(concat('app.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist'));
// });

gulp.task('css', function() {
    gulp.src(['resources/style.css'])
        .pipe(concat('styles.css'))
        .pipe(minify())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch("./resources/*.css", [ 'css' ]);
    // gulp.watch("./resources/*.js", [ 'js' ]);
    gulp.watch("./resources/main.js", [ 'browserify' ]);
});

gulp.task('default', [ 'watch', 'browserify', 'css' ]);