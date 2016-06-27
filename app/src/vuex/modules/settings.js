import { remote } from 'electron';

let settings = remote.getGlobal( 'settings' );
const state = {
  repoPaths : settings.repoPaths,
  app       : settings.app
};

const mutations = {
  UPDATED_REPO_PATHS ( state, repoPaths ) {
    state.repoPaths = repoPaths;
  },

  UPDATED_SETTINGS ( state, settings ) {
    state.app = settings;
  }
};

export default {
  state,
  mutations
};
