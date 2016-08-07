const state = {
  settings : {},
  ready    : false
};

const mutations = {
  APP_READY ( state, ready ) {
    state.ready = ready;
  },
  SETTINGS_LOADED ( state, settings ) {
    state.settings = settings;
  },

  UPDATE_APP_SETTING ( state, name, setting ) {
    const newSettings = {};

    newSettings[ name ] = setting;

    state.settings = Object.assign( state.settings, newSettings );
  }
};

export default {
  state,
  mutations
};
