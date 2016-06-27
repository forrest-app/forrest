import { remote } from 'electron';

let settings = remote.getGlobal( 'settings' );
const state = {
  repos : settings.repos,
  app   : settings.app
};

const mutations = {
  UPDATED_REPOS ( state, repos ) {
    state.repos = repos;
  },

  UPDATED_SETTINGS ( state, settings ) {
    state.app = settings;
  }
};

export default {
  state,
  mutations
};
