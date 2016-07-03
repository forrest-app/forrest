import Vue from 'vue';
import Electron from 'vue-electron';
import Router from 'vue-router';

import App from './App';
import routes from './routes';

Vue.use( Electron );
Vue.use( Router );

// TODO make this generic
import OpenExternal from './Directives/OpenExternal';
Vue.directive( 'openExternal', OpenExternal );

import StayDown from './Directives/StayDown';
Vue.directive( 'stayDown', StayDown );

Vue.config.debug = true;

const router = new Router();

router.map( routes );
router.beforeEach( () => {
  window.scrollTo( 0, 0 );
} );
router.redirect( {
  '*' : '/'
} );

router.start( App, 'app' );
