'use strict';

const exec     = require( 'child_process' ).exec;
const builder  = require( 'electron-builder' );
const Platform = builder.Platform;

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
    builder.build( {
      targets     : Platform.MAC.createTarget(),
      devMetadata : {
        build : config.build
      }
    } )
      .then( () => {
        console.log( 'Build(s) successful!' );
        console.log( 'DONE\n' );
      } )
      .catch( error => {
        console.error( error );
      } );
  } );
}
