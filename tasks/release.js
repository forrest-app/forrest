'use strict';

const exec     = require( 'child_process' ).exec;
const packager = require( 'electron-packager' );

pack();

/**
 * Build webpack in production
 */
function pack () {
  console.log( 'Building webpack in production mode...\n' );
  let pack = exec( 'npm run pack' );

  pack.stdout.on( 'data', data => console.log( data ) );
  pack.stderr.on( 'data', data => console.error( data ) );
  pack.on( 'exit', code => build() );
}


/**
 * Use electron-packager to build electron app
 */
function build () {
  require( '../config' ).getPackConfig( ( error, config ) => {
    let options = config.building;

    console.log( 'Building electron app(s)...\n' );
    packager( options, ( err, appPaths ) => {
      if( err ) {
        console.error( err );
      }

      console.log( 'Build(s) successful!' );
      console.log( appPaths );

      console.log( 'DONE\n' );
    } );
  } );
}
