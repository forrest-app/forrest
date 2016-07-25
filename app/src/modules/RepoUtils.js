import { remote } from 'electron';

const fs = remote.require( 'fs' );

/**
 * Evaluate repo url from a read package data
 *
 * @param {Object} repoData
 *
 * @returns {null|Object}
 */
function getRepoUrl( repoData ) {
  let { repository : repo } = repoData;

  if ( repo ) {
    if ( repo.url ) {
      return repo.url.replace( /(git:\/\/|\.git)/g, '' );
    }

    if ( /^.*?\/.*?$/.test( repo ) ) {
      return `https://github.com/${ repo }`;
    }
  }

  return null;
}


/**
 * Read repo data
 *
 * @param {String} repo path
 *
 * @returns {Promise}
 */
export const readRepoData = function( repoPath ) {
  return new Promise( ( resolve, reject ) => {
    fs.readFile( `${ repoPath }/package.json`, ( error, data ) => {
      if ( error ) {
        return reject( error );
      }

      try {
        var packageJSON = JSON.parse( data );
      } catch( error ) {
        return reject( error );
      }

      let repo = {
        path        : repoPath,
        name        : packageJSON.name,
        description : packageJSON.description,
        url         : getRepoUrl( packageJSON )
      };

      resolve( repo );
    } );
  } );
};