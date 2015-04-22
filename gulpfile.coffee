"use strict"

gulp    = require "gulp"
coffee  = require "gulp-coffee"
concat  = require "gulp-concat"
connect = require "gulp-connect"
header  = require "gulp-header"
gutil   = require "gulp-util"
stylus  = require "gulp-stylus"
uglify  = require "gulp-uglify"
pkg     = require "./package.json"

source =
  coffee: [ "source/app.coffee"
            "source/app.*.coffee"]
  styl  : [ "bower_components/STYLmethods/vendor.styl"
            "source/styles/CONSTANTS.styl"
            "source/styles/flexo.theme.styl"
            "source/styles/site.*.styl"
            ]
  html  : [ "./*.html" ]
  dest  : "assets/"

thirds =
  js    :[ "bower_components/jquery/dist/jquery.min.js"
           "bower_components/jquery.stellar/jquery.stellar.min.js"]
  css   :[ "bower_components/flexo/dist/flexo.css"]
  fonts :[]


banner = [
  "/**"
  " * <%= pkg.name %> - <%= pkg.description %>"
  " * @version v<%= pkg.version %>"
  " * @link    <%= pkg.homepage %>"
  " * @author  <%= pkg.author.name %> (<%= pkg.author.site %>)"
  " * @license <%= pkg.license %>"
  " */"
  ""
].join("\n")

gulp.task "webserver", ->
  connect.server
    port      : 8000
    livereload: true

gulp.task "thirds", ->
  gulp.src thirds.js
    .pipe concat "#{pkg.name}.thirds.js"
    .pipe gulp.dest "#{source.dest}/js"
    .pipe connect.reload()

  gulp.src thirds.css
    .pipe concat "#{pkg.name}.thirds.css"
    .pipe gulp.dest "#{source.dest}/css"
    .pipe connect.reload()

gulp.task "coffee", ->
  gulp.src source.coffee
    .pipe concat "#{pkg.name}.coffee"
    .pipe coffee().on "error", gutil.log
    .pipe uglify mangle: false
    .pipe header banner, pkg: pkg
    .pipe gulp.dest "#{source.dest}/js"
    .pipe connect.reload()

gulp.task "stylus", ->
  gulp.src source.styl
    .pipe concat "#{pkg.name}.styl"
    .pipe stylus
      compress: true
      errors  : true
    .pipe header banner, pkg: pkg
    .pipe gulp.dest "#{source.dest}/css"
    .pipe connect.reload()

gulp.task "html", ->
  gulp.src source.html
    .pipe connect.reload()

gulp.task "init", ["thirds", "coffee", "stylus"]

gulp.task "default", ->
  gulp.run ["webserver"]
  gulp.watch source.coffee, ["coffee"]
  gulp.watch source.styl, ["stylus"]
  gulp.watch source.html, ["html"]
