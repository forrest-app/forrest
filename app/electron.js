'use strict';

const { app, ipcMain, BrowserWindow } = require( 'electron' );
const path                            = require( 'path' );
const ElectronSettings                = require( 'electron-settings' );
const windowStateKeeper               = require( 'electron-window-state' );
const uuid                            = require( 'uuid' );
const GitHubApi                       = require( 'github' );
const menu                            = require( './main/menu' );
const Session                         = require( './main/session' );
const repoUtils                       = require( './main/repoUtils' );
const createRPC                       = require( './main/rpc' );
const github                          = new GitHubApi( {
  protocol : 'https',
  headers  : {
    'user-agent' : 'Forrest - npm desktop client'
  },
  timeout : 5000
} );


// configuration for the available static windows
const initialBgColor = '#f1f1f1';
const staticWindows  = {
  about : {
    config : {
      height          : 625,
      width           : 475,
      backgroundColor : initialBgColor,
      titleBarStyle   : 'hidden',
      resizable       : false
    },
    hash              : '#!/about',
    initializedWindow : null
  },
  help : {
    config : {
      height          : 400,
      width           : 800,
      backgroundColor : initialBgColor,
      titleBarStyle   : 'hidden',
      resizable       : false
    },
    hash              : '#!/help',
    initializedWindow : null
  },
  updateAvailable : {
    config : {
      height          : 300,
      width           : 300,
      backgroundColor : initialBgColor,
      titleBarStyle   : 'hidden',
      resizable       : false
    },
    hash              : '#!/update-available',
    initializedWindow : null
  }
};

const windowSet = new Set( [] );
const rpcSet    = new Set( [] );

let config  = {};
let baseUrl = {
  development : '',
  production  : `file://${ __dirname }/dist/index.html`
};

// enable experimental feature to use context menus
app.commandLine.appendSwitch( '--enable-experimental-web-platform-features' );

if ( process.env.NODE_ENV === 'development' ) {
  config              = require( '../config' ).config;
  baseUrl.development = `http://localhost:${ config.port }`;

  config.url      = `${ baseUrl.development }`;
} else {
  config.devtron  = false;
  config.url      = `${ baseUrl.production }`;
}

ipcMain.on( 'openNewWindow', createWindow );

ipcMain.on( 'shellWrite', () => console.log( arguments ) );

let settings = new ElectronSettings( {
  configFileName : 'npm-app'
} );


/**
 * Open a selected static window
 *
 * @param {String} type - name of the selected window type
 */
function openStaticWindow( type ) {
  if ( ! staticWindows[ type ].initializedWindow ) {
    staticWindows[ type ].initializedWindow = new BrowserWindow(
      staticWindows[ type ].config
    );

    staticWindows[ type ].initializedWindow.loadURL(
      `${ config.url }` + staticWindows[ type ].hash
    );

    staticWindows[ type ].initializedWindow.on(
      'closed', () => staticWindows[ type ].initializedWindow = null
    );
  } else {
    staticWindows[ type ].initializedWindow.focus();
  }
}

/**
 *
 */
function createWindow( event, hash ) {
  let mainWindowState = windowStateKeeper( {
    defaultWidth  : 300,
    defaultHeight : 500
  } );

  /**
   * Initial window options
   */
  let newWindow = new BrowserWindow( {
    height            : mainWindowState.height,
    width             : mainWindowState.width,
    x                 : mainWindowState.x,
    y                 : mainWindowState.y,
    backgroundColor   : initialBgColor,
    alwaysOnTop       : settings.get( 'app.alwaysOnTop' ),
    minWidth          : 250,
    titleBarStyle     : 'hidden',
    'web-preferences' : {
      plugins : true
    }
  } );

  mainWindowState.manage( newWindow );

  let url = hash ? `${ config.url }${ hash }` : config.url;

  newWindow.loadURL( url );

  windowSet.add( newWindow );

  if ( process.env.NODE_ENV === 'development' ) {
    newWindow.webContents.openDevTools( { mode : 'undocked' } );
  }

  if ( config.devtron ) {
    BrowserWindow.addDevToolsExtension( path.join( __dirname, '../node_modules/devtron' ) );
  } else {
    BrowserWindow.removeDevToolsExtension( 'devtron' );
  }

  const rpc      = createRPC( newWindow );
  const sessions = new Map();

  rpcSet.add( rpc );

  rpc.on( 'create session', () => {
    initSession( { /* rows, cols, cwd, shell */ }, ( uid, session ) => {
      sessions.set( uid, session );

      console.log( 'sesstion created', uid );
      rpc.emit( 'session set', {
        uid,
        shell : session.shell,
        pid   : session.pty.pid
      } );

      rpc.emit( 'settings loaded', settings.get( 'app' ) || {} );
      rpc.emit( 'repos loaded', settings.get( 'repos' ) || [] );

      session.on( 'data', ( data ) => {
        rpc.emit( 'session data', { uid, data } );
      } );

      session.on( 'exit', () => {
        rpc.emit( 'session exit', { uid } );
        sessions.delete( uid );
      } );
    } );

    rpc.on( 'data', ( { uid, data } ) => {
      sessions.get( uid ).write( data );
    } );

    rpc.on( 'update app settings', ( { name, setting } ) => {
      settings.set( `app.${ name }`, setting );

      // TODO save on loop here
      windowSet.forEach( ( window ) => {
        if ( name === 'alwaysOnTop' ) {
          window.setAlwaysOnTop( setting );
        }
      } );

      rpcSet.forEach( rpc => rpc.emit( 'setting set', { name, setting } ) );
    } );

    rpc.on( 'add repo', ( repoPath ) => {
      repoUtils.readRepoData( repoPath )
        .then( repo => {
          const repos = [ ...settings.get( 'repos' ), repo ];
          settings.set( 'repos', repos );

          emitAll( 'repos updated', repos );
        } )
        .catch( () => {
          // TODO put error handling here
        } );
    } );

    rpc.on( 'update repo', ( repoPath ) => {
      Promise.all( settings.get( 'repos' ).map( ( repo ) => {
        if ( repo.path === repoPath ) {
          return repoUtils.readRepoData( repoPath );
        }

        return repo;
      } ) )
        .then( repos => {
          settings.set( 'repos', repos );

          emitAll( 'repos updated', repos );
        } )
        .catch( () => {
          // TODO put error handling here
        } );
    } );

    rpc.on( 'remove repo', ( repoPath ) => {
      const repos = settings.get( 'repos' ).reduce( ( repos, storedRepo ) => {
        if ( storedRepo.path !== repoPath ) {
          repos.push( storedRepo );
        }

        return repos;
      }, [] );

      settings.set( 'repos', repos );

      emitAll( 'repos updated', repos );
    } );
  } );


  const deleteSessions = () => {
    sessions.forEach( ( session, key ) => {
      rpc.removeAllListeners( 'data' );
      rpc.removeAllListeners( 'update app settings' );
      rpc.removeAllListeners( 'add repo' );
      rpc.removeAllListeners( 'update repo' );
      rpc.removeAllListeners( 'remove repo' );

      session.removeAllListeners();
      session.destroy();
      sessions.delete( key );
    } );
  };

  newWindow.on( 'close', () => {
    windowSet.delete( newWindow );
    rpcSet.delete( rpc );

    rpc.destroy();
    deleteSessions();
  } );

  // we reset the rpc channel only upon
  // subsequent refreshes (ie: F5)
  newWindow.webContents.on( 'did-navigate', deleteSessions );

  if ( windowSet.size === 1 ) {
    menu.init( {
      createWindow,
      openStaticWindow
    } );
  }

  /* eslint-disable no-console */
  console.log( 'window opened' );
}

function emitAll() {
  rpcSet.forEach( rpc => rpc.emit.apply( rpc, arguments ) );
}

function initSession( opts, fn ) {
  fn( uuid.v4(), new Session( opts ) );
}

if ( process.env.NODE_ENV !== 'development' ) {
  github.repos.getReleases(
    { user : 'stefanjudis', repo : 'forrest' },
    ( error, releases ) => {
      if ( error ) {
        return;
      }

      if ( releases.length && releases[ 0 ].tag_name !== `v${ app.getVersion() }` ) {
        openStaticWindow( 'updateAvailable' );
      }
    }
  );
}

app.on( 'ready', createWindow );

app.on( 'window-all-closed', () => {
  if ( process.platform !== 'darwin' ) {
    app.quit();
  }
} );

app.on( 'activate', () => {
  if ( ! windowSet.size ) {
    createWindow();
  }
} );
