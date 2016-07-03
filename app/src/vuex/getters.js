export function getRepos( state ) {
  return state.settings.repos;
}

export function getAppSettings( state ) {
  return state.settings.app;
}

export function getConfigSettings( state ) {
  return state.defaults.settings;
}
