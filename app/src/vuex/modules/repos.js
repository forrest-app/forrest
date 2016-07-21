import ElectronSettings from 'electron-settings';
import { ipcRenderer } from 'electron';

let settings = new ElectronSettings( {
  configFileName : 'npm-app'
} );

const state = {
  all : settings.get( 'repos' ) || []
};

const mutations = {
  ADD_REPO ( state, repo ) {
    state.all = [ ...state.all, repo ];

    settings.set( 'repos', state.all );
    ipcRenderer.send( 'updatedRepos', JSON.stringify( state.all ) );
  },

  REMOVE_REPO_WITH_INDEX ( state, repoIndex ) {
    state.all = state.all.filter( ( repo, index ) => index !== repoIndex );

    settings.set( 'repos', state.all );
    ipcRenderer.send( 'updatedRepos', JSON.stringify( state.all ) );
  },

  UPDATED_REPOS( state, repos ) {
    state.all = repos;
  }
};

export default {
  state,
  mutations
};
