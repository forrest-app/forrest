'use strict';

const { app, ipcMain, BrowserWindow } = require( 'electron' );
const path                            = require( 'path' );
const menu                            = require( './main/menu' );
const fixPath                         = require( 'fix-path' );
const windowStateKeeper               = require( 'electron-window-state' );

// configuration for the available static windows
const staticWindows = {
  about : {
    config : {
      height          : 625,
      width           : 475,
      backgroundColor : '#f1f1f1',
      titleBarStyle   : 'hidden',
      resizable       : false
    },
    hash : '#!/about',
    initializedWindow : null
  },
  help : {
    config : {
      height          : 625,
      width           : 725,
      backgroundColor : '#f1f1f1',
      titleBarStyle   : 'hidden',
      resizable       : false
    },
    hash : '#!/help',
    initializedWindow : null
  }
};

let mainWindows = [];
let aboutWindow;
let helpWindow;
let config  = {};
let baseUrl = {
  development : ``,
  production  : `file://${ __dirname }/dist/index.html`
};

// fix path to guarantee that npm and node are available
fixPath();

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

ipcMain.on( 'updatedAppSetting', ( event, key, value ) => {
  if ( key === 'alwaysOnTop' ) {
    mainWindows.forEach( window => {
      window.setAlwaysOnTop( value );
    } );
  }
} );

ipcMain.on( 'updatedRepos', ( event, reposString ) => {
  mainWindows.forEach(
    window => window.webContents.send( 'updatedRepos', reposString )
  );
} );

ipcMain.on( 'openNewWindow', createWindow );

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
    backgroundColor   : '#f1f1f1',
    minWidth          : 250,
    titleBarStyle     : 'hidden',
    'web-preferences' : {
      plugins : true
    }
  } );

  mainWindowState.manage( newWindow );

  let url = hash ? `${ config.url }${ hash }` : config.url;

  newWindow.loadURL( url );

  if ( process.env.NODE_ENV === 'development' ) {
    newWindow.webContents.openDevTools( { mode : 'undocked' } );
  }

  newWindow.on( 'closed', () => {
    mainWindows = mainWindows.reduce( ( windows, window ) => {
      if ( window !== newWindow ) {
        windows.push( window );
      }

      return windows;
    }, [] );
  } );

  if ( config.devtron ) {
    BrowserWindow.addDevToolsExtension( path.join( __dirname, '../node_modules/devtron' ) );
  } else {
    BrowserWindow.removeDevToolsExtension( 'devtron' );
  }

  mainWindows.push( newWindow );

  if ( mainWindows.length === 1 ) {
    menu.init( {
      createWindow,
      openStaticWindow
    } );
  }

  /* eslint-disable no-console */
  console.log( 'window opened' );
}

app.on( 'ready', createWindow );

app.on( 'window-all-closed', () => {
  if ( process.platform !== 'darwin' ) {
    app.quit();
  }
} );

app.on( 'activate', () => {
  if ( ! mainWindows.length ) {
    createWindow();
  }
} );
