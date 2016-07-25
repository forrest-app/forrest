import { readRepoData } from '../modules/RepoUtils';

export const addRepoWithPath = function( { dispatch, state }, repoPath ) {
  let repoIsAlreadyAdded = state.repos.all.some( repo => repo.path === repoPath );

  if ( ! repoIsAlreadyAdded ) {
    readRepoData( repoPath )
      .then( repo => {
        dispatch( 'ADD_REPO', repo );
      } )
      .catch( () => {
        // TODO put error handling here
      } );
  } else {
    new Notification(
      'Project is already in the list',
      {
        body : `-> ${ repoPath }`
      }
    );
  }
};

export const reloadRepo = function( { dispatch, state }, repo ) {
  readRepoData( repo.path )
    .then( repo => {
      dispatch( 'RELOAD_REPO', repo );
    } )
    .catch( () => {
      // TODO put error handling here
    } );
};

export const removeRepo = function( { dispatch, state }, repo ) {
  let repoIndex = state.repos.all.findIndex(
    savedRepo => savedRepo.name === repo.name
  );

  if ( repoIndex !== -1 ) {
    dispatch( 'REMOVE_REPO_WITH_INDEX', repoIndex );
  }
};

export const updateAppSetting = function( { dispatch }, name, setting ) {
  dispatch( 'UPDATE_APP_SETTING', name, setting );
};

export const handleUpdatedRepos = function( { dispatch }, repos ) {
  dispatch( 'UPDATED_REPOS', repos );
};
