import ElectronSettings from 'electron-settings';

let settings = new ElectronSettings( {
  configFileName : 'npm-app'
} );

const state = settings.get( 'repos' ) || [];


const repoMutation = function( state, newState = {} ) {
  let base = {
    openAreas : {
      defaultCommands : false,
      customCommands  : true
    }
  };

  return Object.assign( base, state, newState );
};

const mutations = {
  ADD_REPO ( state, repo ) {
    state.push( repoMutation( repo ) );

    settings.set( 'repos', state );
  },

  REMOVE_REPO_WITH_INDEX ( state, repoIndex ) {
    state.splice( repoIndex, 1 );

    settings.set( 'repos', state );
  },

  TOGGLE_VISIBLE_REPO_AREA ( state, repo, areaName ) {
    let storedRepo = state.find( r => r.name === repo.name );

    storedRepo.openAreas[ areaName ] = ! storedRepo.openAreas[ areaName ];

    settings.set( 'repos', state );
  }
};

export default {
  state,
  mutations
};
