'use strict';

const exec = require( 'child_process' ).exec;

appInstall();

function appInstall () {
  console.log(
    'Running postinstall...\nRunning npm install in app directory...'
  );

  let install = exec( 'cd app && npm i' );

  install.stdout.on( 'data', data => console.log( data ) );
  install.stderr.on( 'data', data => console.error( data ) );
  install.on( 'exit', code => {
    console.log( 'DONE!' );
    process.exit( code );
  } );
}