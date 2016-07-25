'use strict';

const { app, ipcMain, BrowserWindow } = require( 'electron' );
const path                            = require( 'path' );
const menu                            = require( './main/menu' );
const fixPath                         = require( 'fix-path' );
const windowStateKeeper               = require( 'electron-window-state' );

let mainWindows = [];
let aboutWindow;
let config = {};

// fix path to guarantee that npm and node are available
fixPath();

// enable experimental feature to use context menus
app.commandLine.appendSwitch( '--enable-experimental-web-platform-features' );

if ( process.env.NODE_ENV === 'development' ) {
  config          = require( '../config' ).config;
  config.url      = `http://localhost:${ config.port }`;
  config.aboutUrl = `http://localhost:${ config.port }#!/about`;
} else {
  config.devtron  = false;
  config.url      = `file://${ __dirname }/dist/index.html`;
  config.aboutUrl = `file://${ __dirname }/dist/index.html#!/about`;
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

function openAboutWindow() {
  if ( ! aboutWindow ) {
    aboutWindow = new BrowserWindow( {
      height        : 625,
      width         : 475,
      titleBarStyle : 'hidden',
      resizable     : false
    } );

    aboutWindow.loadURL( config.aboutUrl );

    aboutWindow.on( 'closed', () => aboutWindow = null );
  } else {
    aboutWindow.focus();
  }
}

/**
 *
 */
function createWindow( event, hash ) {
  let mainWindowState = windowStateKeeper( {
    defaultWidth  : 500,
    defaultHeight : 300
  } );

  /**
   * Initial window options
   */
  let newWindow = new BrowserWindow( {
    height            : mainWindowState.height,
    width             : mainWindowState.width,
    x                 : mainWindowState.x,
    y                 : mainWindowState.y,
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
      openAboutWindow
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
