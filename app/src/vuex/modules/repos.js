const state = {
  all : []
};

const mutations = {
  REPOS_LOADED ( state, repos ) {
    state.all = repos;
  },

  REPOS_UPDATED ( state, repos ) {
    state.all = repos;
  }
};

export default {
  state,
  mutations
};
