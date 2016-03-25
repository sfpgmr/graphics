!function(){
'use strict';
var fs = require('fs');
var gulp = require('gulp');
var logger = require('gulp-logger');
var watch = require('gulp-watch');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var uglifyify = require('uglifyify');
var browserSync =require('browser-sync');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var atImport = require('postcss-import');


// JSのビルド
gulp.task('js',function(){
    browserify('./src/js/sfstyle.js',{debug:true,extensions: ['.js']})
    .transform(babelify,{"plugins": [
      "transform-es2015-arrow-functions",
      "transform-es2015-block-scoped-functions",
      "transform-es2015-block-scoping",
      "transform-es2015-classes",
      "transform-es2015-computed-properties",
//      "transform-es2015-constants",
      "transform-es2015-destructuring",
      "transform-es2015-for-of",
      "transform-es2015-function-name",
      "transform-es2015-literals",
      "transform-es2015-modules-commonjs",
      "transform-es2015-object-super",
      "transform-es2015-parameters",
      "transform-es2015-shorthand-properties",
      "transform-es2015-spread",
      "transform-es2015-sticky-regex",
      "transform-es2015-template-literals",
      "transform-es2015-typeof-symbol",
      "transform-es2015-unicode-regex"
      ]})
//    .transform({global:true},uglifyify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js'));

});




// CSSのビルド
gulp.task('postcss', function() {
    gulp.src('./src/css/sfstyle.css')
        .pipe(plumber())
        .pipe(postcss([
            atImport(),
            require('postcss-mixins')(),
            require('postcss-nested')(),
            require('postcss-simple-vars')(),
            require('cssnext')(),
//            require('cssnano')(),
            autoprefixer({ browsers: ['last 2 versions'] })
        ]))
        .pipe(gulp.dest('./dist/css'))
        .pipe(logger({ beforeEach: '[postcss] wrote: ' }));
});

//HTMLのコピー
gulp.task('html',function(){
  gulp.src('./src/html/*.html').pipe(gulp.dest('./dist'));
});

// devverディレクトリへのコピー
gulp.task('devver',function(){
  var date = new Date();
  var destdir = './devver/' + date.getUTCFullYear() + ('0' + (date.getMonth() + 1)).slice(-2)  + ('0' + date.getDate()).slice(-2);
  
  try {
    fs.mkdirSync(destdir);
  } catch (e){
    
  }
  
  try {
    fs.mkdirSync(destdir + '/js');
  } catch (e){
    
  }

  try {
    fs.mkdirSync(destdir + '/css');
  } catch (e){
    
  }
  
  gulp.src('./dist/*.html').pipe(gulp.dest(destdir));
  gulp.src('./dist/js/*.js').pipe(gulp.dest(destdir + '/js'));
  gulp.src('./dist/css/*.*').pipe(gulp.dest(destdir + '/css'));

});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
             baseDir: "./dist/"
            ,index  : "index.html"
        },
        files:['./dist/**/*.*']
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default',['js','postcss','browser-sync'],function(){
    watch('./src/js/**/*.js',()=>gulp.start(['js']));
    watch('./src/css/**/*.css',()=>gulp.start(['postcss']));
    watch('./dist/**/*.*',()=>gulp.start(['bs-reload']));
});
}();