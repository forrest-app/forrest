export function getRepos( state ) {
  return state.repos.all;
}

export function getAppSettings( state ) {
  return state.app;
}

export function getConfigSettings( state ) {
  return state.defaults.settings;
}

export function getDefaultCommands( state ) {
  return state.defaults.commands;
}
