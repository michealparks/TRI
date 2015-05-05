( function() {
'use strict';

const gulp   = require( 'gulp' );
const gulpif = require( 'gulp-if' );

// Javascript
const babel  = require( 'gulp-babel' );
const concat = require( 'gulp-concat' );
const addsrc = require( 'gulp-add-src' );
const uglify = require( 'gulp-uglify' );

// CSS
const stylus = require( 'gulp-stylus' );
const nib    = require( 'nib' );

// HTML
const jade   = require( 'gulp-jade' );
const inline = require( 'gulp-inline' );

// Server
const webserver = require( 'gulp-webserver' );

const buildDest = gulp.dest( 'build' );

const production = false;

gulp.task( 'javascript', function () {
  gulp.src( [ 'app/**/*.js' ] )
    .pipe( babel( { modules: 'amd', moduleIds: true } ) )
    .on( 'error', function ( e ) {
      console.error( e.message );
      this.emit( 'end' );
    } )
    .pipe( addsrc.prepend( 'bower/**/*.js' ) )
    .pipe( addsrc.prepend( 'lib/**/*.js' ) )
    .pipe( concat( 'app.js' ) )
    .pipe( gulpif( production, uglify( { reserved: 'require' } ) ) )
    .pipe( gulp.dest( 'build' ) );
} );

gulp.task( 'css', function () {
  gulp.src( [ 'app/**/!(variables|mixins)*.styl' ] )
    .pipe( addsrc.prepend( 'app/styl/*(mixins|variables).styl' ) )
    .pipe( concat( 'app.styl' ) )
    .pipe( stylus( { use: nib(), compress: true } ) )
    .pipe( gulp.dest( 'build' ) );
} );

gulp.task( 'html', ['javascript', 'css'], function () {
  gulp.src( [ 'app/**/*.jade' ] )
    .pipe( jade( { } ) )
    .pipe( gulpif( production, inline( { base: 'build' } ) ) )
    .pipe( gulp.dest( 'build' ) );
} );

gulp.task( 'webserver', function () {
  gulp.src( 'build' )
    .pipe( webserver( {
      livereload: true,
      host: '0.0.0.0',
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    } ) );
} );

const mainTasks = ['javascript', 'css', 'html'];

gulp.task( 'watch', function () { 
  gulp.watch( [ './app/**' ], [ mainTasks ] ); 
} );
gulp.task( 'build', mainTasks.concat( [ 'inline' ] ) );
gulp.task( 'default', mainTasks.concat( [ 'webserver', 'watch' ] ) );

} () );



