'use strict';

const path            = require( 'path' );
const pkg             = require( './app/package.json' );
const platform        = process.env.PLATFORM_TARGET || 'all';
const getDependencies = require( 'dependency-list' );

const config = {
  name        : pkg.name,
  devtron     : true,
  eslint      : true,
  port        : 9080,
  vueDevTools : false,
  building    : {
    'app-version'        : pkg.version,
    arch                 : 'x64',
    asar                 : false,
    dir                  : path.join( __dirname, 'app' ),
    icon                 : path.join( __dirname, 'app/icons/icon' ),
    packagesToBeIncluded : [ 'fix-path' ],
    out                  : path.join( __dirname, 'builds' ),
    overwrite            : true,
    platform
  }
};
config.building.name = config.name;


/**
 *
 */
function getPackConfig( callback ) {

  let versionMap = getPackageVersionsFromApp( config.building.packagesToBeIncluded );

  // that can be prettier
  getDependencies( versionMap, ( error, result ) => {
    if ( error ) {
      return console.error( error );
    }

    let shouldNotBeIgnored = new RegExp(
      `^.*?(electron\.js|package\.json|main|dist|${ Object.keys( result ).join( '|' ) }).*$`
    );

    config.building.ignore = ( filePath ) => {
      return filePath.length &&
        filePath !== '/node_modules' &&
        (
          ! shouldNotBeIgnored.test( filePath ) ||
          /src|main.ejs|icons/.test( filePath )
        );
    };

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
