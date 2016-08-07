const state = {
  id     : null,
  output : ''
};

const mutations = {
  CLEAR_SESSION_OUTPUT ( state ) {
    state.output = '';
  },
  SET_SESSION ( state, session ) {
    state.uid = session.uid;
  },
  UPDATE_SESSION_OUTPUT ( state, data ) {
    state.output = state.output + data.data;
  }
};

export default {
  state,
  mutations
};
