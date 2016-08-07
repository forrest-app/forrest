export function getRepos( state ) {
  return state.repos.all;
}

export function getAppSettings( state ) {
  return state.app.settings;
}

export function isAppReady( state ) {
  return state.app.ready;
}

export function getConfigSettings( state ) {
  return state.defaults.settings;
}

export function getDefaultCommands( state ) {
  return state.defaults.commands;
}

export function getSessionOutput( state ) {
  return state.session.output;
}
