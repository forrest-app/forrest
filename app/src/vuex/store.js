import RPC from '../modules/Rpc';
import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use( Vuex );

const rpc   = new RPC();
const store = new Vuex.Store( {
  modules,
  strict : true
} );

console.log( window.rpc );

window.__defineGetter__( 'rpc', () => rpc );


// all JS is loaded now it's
// time to spawn the session
rpc.on( 'ready', () => {
  rpc.emit( 'create session' );
} );

rpc.on( 'repos loaded', ( repos ) => {
  store.dispatch( 'REPOS_LOADED', repos );
  store.dispatch( 'APP_READY', true );
} );

rpc.on( 'repos updated', ( repos ) => {
  store.dispatch( 'REPOS_UPDATED', repos );
} );

rpc.on( 'session set', ( session ) => {
  store.dispatch( 'SET_SESSION', session );
} );

rpc.on( 'session data', ( data ) => {
  store.dispatch( 'UPDATE_SESSION_OUTPUT', data );
} );

rpc.on( 'setting set', ( { name, setting } ) => {
  store.dispatch( 'UPDATE_APP_SETTING', name, setting );
} );

rpc.on( 'settings loaded', ( settings ) => {
  store.dispatch( 'SETTINGS_LOADED', settings );
} );

export default store;
