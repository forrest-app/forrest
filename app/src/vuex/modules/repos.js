import ElectronSettings from 'electron-settings';

let settings = new ElectronSettings( {
  configFileName : 'npm-app'
} );

const state = settings.get( 'repos' ) || [];

const mutations = {
  ADD_REPO ( state, repo ) {
    state.push( repo );

    settings.set( 'repos', state );
  },

  REMOVE_REPO_WITH_INDEX ( state, repoIndex ) {
    state.splice( repoIndex, 1 );

    settings.set( 'repos', state );
  }
};

export default {
  state,
  mutations
};
