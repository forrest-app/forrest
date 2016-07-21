'use strict';

const pkg             = require( './app/package.json' );
const getDependencies = require( 'dependency-list' );

const config = {
  name        : pkg.name,
  devtron     : true,
  eslint      : true,
  port        : 9080,
  vueDevTools : false,
  build       : {
    'app-version'        : pkg.version,
    packagesToBeIncluded : [ 'fix-path' ],
    overwrite            : true,
    asar                 : false
  }
};

/**
 *
 */
function getPackConfig( callback ) {

  let versionMap = getPackageVersionsFromApp( config.build.packagesToBeIncluded );

  // that can be prettier
  getDependencies( versionMap, ( error, result ) => {
    if ( error ) {
      return console.error( error );
    }

    config.build.files = [
      'electron.js',
      'package.json',
      'main/*',
      'dist/*',
      '!node_modules/*',
      ...Object.keys( result ).map( dep => `node_modules/${ dep }` )
    ];

    callback( null, config );
  } );
}


/**
 *
 */
function getPackageVersionsFromApp( packages ) {
  const appPackageJson = require( './app/package' );

  return packages.reduce( ( versionMap, packageName ) => {
    versionMap[ packageName ] = appPackageJson.dependencies[ packageName ];

    return versionMap;
  }, {} );
}


module.exports = {
  config        : config,
  getPackConfig : getPackConfig
};
