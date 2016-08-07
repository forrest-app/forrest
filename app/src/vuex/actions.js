export const addRepoWithPath = function( { dispatch, state }, repoPath ) {
  let repoIsAlreadyAdded = state.repos.all.some( repo => repo.path === repoPath );

  if ( ! repoIsAlreadyAdded ) {
    window.rpc.emit(
      'add repo',
      repoPath
    );
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
  window.rpc.emit(
    'update repo',
    repo.path
  );
};

export const removeRepo = function( { dispatch, state }, repo ) {
  window.rpc.emit(
    'remove repo',
    repo.path
  );
};

export const updateAppSetting = function( { dispatch }, name, setting ) {
  window.rpc.emit(
    'update app settings',
    { name, setting }
  );
};

export const handleUpdatedRepos = function( { dispatch }, repos ) {
  dispatch( 'UPDATED_REPOS', repos );
};

export const writeSessionData = function( { dispatch, state }, data ) {
  window.rpc.emit( 'data', { uid : state.session.uid, data } );
};

export const execSessionCmd = function( { dispatch, state }, data ) {
  data = `${ data }\n`;
  window.rpc.emit( 'data', { uid : state.session.uid, data } );
};

export const clearSessionData = function( { dispatch, state }, data ) {
  dispatch( 'CLEAR_SESSION_OUTPUT', data );
};

export const updateSessionOutput = function( { dispatch }, data ) {
  dispatch( 'UPDATE_SESSION_OUTPUT', data );
};

export const setTerminalSize = function( { dispatch, state }, cols, rows ) {
  window.rpc.emit(
    'set terminal size', { uid : state.session.uid, cols, rows }
  );
};
