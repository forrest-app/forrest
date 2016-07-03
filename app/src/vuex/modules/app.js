import ElectronSettings from 'electron-settings';

let settings = new ElectronSettings( {
  configFileName : 'npm-app'
} );

const state = settings.get( 'app' ) || {};

const mutations = {
  UPDATE_APP_SETTING ( state, name, setting ) {
    state[ name ] = setting;
    settings.set( `app.${ name }` , setting );
  }
};

export default {
  state,
  mutations
};
