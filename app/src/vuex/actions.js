import { ipcRenderer } from 'electron';

export const addRepoWithPath = function( { dispatch, state }, repoPath ) {
  ipcRenderer.once( 'updated-repos', function( event, repos ) {
    dispatch( 'UPDATED_REPOS', repos );
  } );

  ipcRenderer.send( 'add-repo', repoPath );
};

export const updateAppSetting = function( { dispatch, state }, name, setting ) {
  ipcRenderer.once( 'updated-settings', function( event, settings ) {
    dispatch( 'UPDATED_SETTINGS', settings );
  } );

  ipcRenderer.send( 'update-setting', name, setting );
};
