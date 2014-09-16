"use strict"

// -- DEPENDENCIES -------------------------------------------------------------
var gulp    = require('gulp');
var coffee  = require('gulp-coffee');
var concat  = require('gulp-concat');
var flatten = require('gulp-flatten');
var header  = require('gulp-header');
var uglify  = require('gulp-uglify');
var gutil   = require('gulp-util');
var stylus  = require('gulp-stylus');
var yml     = require('gulp-yml');
var pkg     = require('./package.json');

// -- FILES --------------------------------------------------------------------
var assets = 'static/';
var source = {
  coffee: [ 'source/app.coffee',
            'source/app.*.coffee'],
  styl  : [ 'source/styles/__init.styl',
            'source/styles/reset.styl',
            'source/styles/app.styl',
            'source/styles/app.*.styl']};

var dependencies = {
    js   :[ 'bower_components/jquery/dist/jquery.min.js',
            'bower_components/jquery.stellar/jquery.stellar.min.js'],
    css  :[ ''],
    fonts:[ 'dependencies/atoms.icons/fonts/*',
            'dependencies/icomoon/fonts/*'] };

var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link    <%= pkg.homepage %>',
  ' * @author  <%= pkg.author.name %> (<%= pkg.author.site %>)',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

// -- TASKS --------------------------------------------------------------------
gulp.task('dependencies', function() {
  gulp.src(dependencies.js)
    .pipe(concat(pkg.name + '.dependencies.js'))
    .pipe(uglify({mangle: false}))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest(assets + '/js'));

  gulp.src(dependencies.css)
    .pipe(concat(pkg.name + '.dependencies.css'))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest(assets + '/css'));

  gulp.src(dependencies.fonts)
    .pipe(gulp.dest(assets + '/css/fonts'));
});

gulp.task('coffee', function() {
  gulp.src(source.coffee)
    .pipe(concat(pkg.name + '.coffee'))
    .pipe(coffee().on('error', gutil.log))
    .pipe(uglify({mangle: false}))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest(assets + '/js'));
});

gulp.task('styl', function() {
  gulp.src(source.styl)
    .pipe(concat(pkg.name + '.styl'))
    .pipe(stylus({compress: true, errors: true}))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest(assets + '/css'));
});

gulp.task('init', function() {
  gulp.run(['dependencies', 'coffee', 'styl'])
});

gulp.task('default', function() {
  gulp.watch(source.coffee, ['coffee']);
  gulp.watch(source.styl, ['styl']);
});
