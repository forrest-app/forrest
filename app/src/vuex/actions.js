import { remote } from 'electron';

const fs = remote.require( 'fs' );

export const addRepoWithPath = function( { dispatch, state }, repoPath ) {
  fs.readFile( `${ repoPath }/package.json`, ( error, data ) => {
    // TODO put error handling here

    try {
      var packageJSON = JSON.parse( data );
    } catch( error ) {
      // TODO error handling
    }

    if ( ! state.repos.some( repo => repo.path === repoPath ) ) {
      let url = packageJSON.repository &&
      packageJSON.repository.url &&
      packageJSON.repository.url.replace( /(git:\/\/|\.git)/g, '' );

      let repo = {
        path        : repoPath,
        name        : packageJSON.name,
        description : packageJSON.description,
        url         : url
      };

      dispatch( 'ADD_REPO', repo );
    } else {
      // TODO put error handling here
    }
  } );
};

export const removeRepo = function( { dispatch, state }, repo ) {
  let repoIndex = state.repos.findIndex( savedRepo => savedRepo.name === repo.name );

  if ( repoIndex !== -1 ) {
    dispatch( 'REMOVE_REPO_WITH_INDEX', repoIndex );
  }
};

export const updateAppSetting = function( { dispatch }, name, setting ) {
  dispatch( 'UPDATE_APP_SETTING', name, setting );
};
