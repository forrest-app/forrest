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
    packagesToBeIncluded : [ 'electron-settings', 'electron-window-state', 'github', 'default-shell', 'child_pty', 'uuid' ],
    overwrite            : true,
    asar                 : false,
    dmg                  : {
      'background-color' : '#E1E1E1',
      contents           : [
        {
          x    : 485,
          y    : 240,
          type : 'link',
          path : '/Applications'
        },
        {
          x    : 120,
          y    : 240,
          type : 'file'
        }
      ],
      'icon-size' : 100,
      window      : {
        width  : 600,
        height : 500
      }
    },
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
      'dist/**/*',
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
