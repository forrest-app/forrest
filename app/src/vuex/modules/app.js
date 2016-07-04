import ElectronSettings from 'electron-settings';
import { ipcRenderer } from 'electron';

let settings = new ElectronSettings( {
  configFileName : 'npm-app'
} );

const state = settings.get( 'app' ) || {};

Object.keys( state ).forEach( key => {
  ipcRenderer.send( 'updatedAppSetting', key, state[ key ] );
} );

const mutations = {
  UPDATE_APP_SETTING ( state, name, setting ) {
    state[ name ] = setting;
    settings.set( `app.${ name }` , setting );
    ipcRenderer.send( 'updatedAppSetting', name, setting );
  }
};

export default {
  state,
  mutations
};
