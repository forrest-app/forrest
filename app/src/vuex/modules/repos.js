import ElectronSettings from 'electron-settings';

let settings = new ElectronSettings( {
  configFileName : 'npm-app'
} );

const state = {
  items : settings.get( 'repos' ) || []
};

const mutations = {
  ADD_REPO ( state, repo ) {
    state.items = [ ...state.items, repo ];

    settings.set( 'repos', state.items );
  },

  REMOVE_REPO ( state, repo ) {
    state.items = state.items.reduce( ( repos, savedRepo ) => {
      if ( savedRepo.path !== repo.path ) {
        repos.push( savedRepo );
      }

      return repos;
    }, [] );

    settings.set( 'repos', state.items );
  }
};

export default {
  state,
  mutations
};
