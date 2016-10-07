var gulp       = require('gulp'),
    browserify = require('browserify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    source     = require('vinyl-source-stream');

gulp.task('browserify-chat', function() {
    return browserify({ entries: ['public/resources/main.js'] })
        .bundle()
        .pipe(source('chat.js'))
        .pipe(gulp.dest('public/dist'));
});

gulp.task('browserify-console', function() {
    return browserify({ entries: ['public/resources/console.js'] })
        .bundle()
        .pipe(source('console.js'))
        .pipe(gulp.dest('public/dist'));
});

// gulp.task('js', function() {
//     gulp.src(npmJsDeps)
//         .pipe(concat('app.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist'));
// });

// gulp.task('css', function() {
//     gulp.src(['public/resources/style.css'])
//         .pipe(concat('styles.css'))
//         .pipe(minify())
//         .pipe(gulp.dest('public/dist'));
// });

gulp.task('watch', function() {
    // gulp.watch("public/resources/*.css", [ 'css' ]);
    // gulp.watch("public/resources/*.js", [ 'js' ]);
    gulp.watch("public/resources/main.js", [ 'browserify-chat' ]);
    gulp.watch("public/resources/console.js", [ 'browserify-console' ]);
});

gulp.task('default', [ 'browserify-chat', 'browserify-console']);
gulp.task('watch-default', [ 'watch', 'browserify-chat', 'browserify-console']);