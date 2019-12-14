var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    rigger = require('gulp-rigger'),
    uglify = require('gulp-uglify'),
    fileinclude = require('gulp-ex-file-include'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    rsync = require('gulp-rsync'),
    basePath = require('path'),
    svgmin = require('gulp-svgmin'),
    svgstore = require('gulp-svgstore');


gulp.task('svgIcons', function () {
    return gulp
        .src('./src/img/icons/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = basePath.basename(file.relative, basePath.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('./build/img/'));
});


// Local Server
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './build'
        },
        notify: false
    })
});

// SCSS Styles
gulp.task('styles', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer(['last 2 versions']))
        .pipe(cleancss({level: {1: {specialComments: 0}}})) // Opt., comment out when debugging
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream())
});

// JS
gulp.task('scripts', function () {
    return gulp.src([
        './src/js/*.js'
    ])
        .pipe(rigger())
        .pipe(uglify())
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.reload({stream: true}))
});

// HTML Live Reload
gulp.task('code', function () {
    return gulp.src([
        './src/view/*.html'
    ])
        .pipe(fileinclude())
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.reload({stream: true}))
});

// img task
gulp.task('img', function () {
    return gulp.src([
        './src/img/**/*.*'
    ])
        .pipe(gulp.dest('./build/img'))
        .pipe(browserSync.reload({stream: true}))
});

// favicon task
gulp.task('favicon', function () {
    return gulp.src([
        './src/favicon/*.*'
    ])
        .pipe(gulp.dest('./build/favicon'))
        .pipe(browserSync.reload({stream: true}))
});

// fonts task
gulp.task('fonts', function () {
    return gulp.src([
        './src/fonts/*.*'
    ])
        .pipe(gulp.dest('./build/fonts'))
        .pipe(browserSync.reload({stream: true}))
});

// Deploy
gulp.task('rsync', function () {
    return gulp.src('./src/**')
        .pipe(rsync({
            root: './build/',
            hostname: 'artlenk.ru@gmail.com',
            destination: 'yousite/public_html/',
            // include: ['*.htaccess'], // Includes files to deploy
            exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
            recursive: true,
            archive: true,
            silent: false,
            compress: true
        }))
});


gulp.task('img', gulp.parallel('img'));

gulp.task('favicon', gulp.parallel('favicon'));

gulp.task('fonts', gulp.parallel('fonts'));

gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('styles'));
    gulp.watch(['./src/js/**/*.js'], gulp.parallel('scripts'));
    gulp.watch('./src/view/*.html', gulp.parallel('code'));
    gulp.watch('./src/img/**/*', gulp.parallel('img'));
    gulp.watch('./src/favicon/**/*', gulp.parallel('favicon'));
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts'));
});

gulp.task('default', gulp.parallel('img', 'favicon', 'fonts', 'styles', 'scripts', 'code', 'browser-sync', 'watch'));