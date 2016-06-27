import { ipcRenderer } from 'electron';

export const addRepoPath = function( { dispatch, state }, repoPath ) {
  ipcRenderer.once( 'updated-repos', function( event, repoPaths ) {
    dispatch( 'UPDATED_REPO_PATHS', repoPaths );
  } );

  ipcRenderer.send( 'add-repo', repoPath );
};

export const updateAppSetting = function( { dispatch, state }, name, setting ) {
  ipcRenderer.once( 'updated-settings', function( event, settings ) {
    dispatch( 'UPDATED_SETTINGS', settings );
  } );

  ipcRenderer.send( 'update-setting', name, setting );
};
