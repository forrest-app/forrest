import ElectronSettings from 'electron-settings';

let settings = new ElectronSettings( {
  configFileName : 'npm-app'
} );

const state = {
  repos : settings.get( 'repos' ) || [],
  app   : settings.get( 'app' ) || {}
};

const mutations = {
  ADD_REPO ( state, repo ) {
    state.repos = [ ...state.repos, repo ];

    settings.set( 'repos', state.repos );
  },

  REMOVE_REPO( state, repo ) {
    state.repos = state.repos.reduce( ( repos, savedRepo ) => {
      if ( savedRepo.path !== repo.path ) {
        repos.push( savedRepo );
      }

      return repos;
    }, [] );

    settings.set( 'repos', state.repos );
  },

  UPDATE_APP_SETTING ( state, name, setting ) {
    state.app[ name ] = setting;
    settings.set( `app.${ name }` , setting );
  }
};

export default {
  state,
  mutations
};
