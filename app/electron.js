'use strict';

const { app, ipcMain, BrowserWindow } = require( 'electron' );
const path                            = require( 'path' );
const menu                            = require( './main/menu' );
const fixPath                         = require( 'fix-path' );

let mainWindows = [];
let config = {};

// fix path to guarantee that npm and node are available
fixPath();

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

ipcMain.on( 'openNewWindow', () => {
  createWindow();
} );

function openAboutWindow() {
  let aboutWindow = new BrowserWindow( {
    height        : 400,
    width         : 400,
    titleBarStyle : 'hidden',
    resizable     : false
  } );

  aboutWindow.loadURL( config.aboutUrl );
}

/**
 *
 */
function createWindow() {
  /**
   * Initial window options
   */
  let newWindow = new BrowserWindow( {
    height        : 500,
    width         : 300,
    titleBarStyle : 'hidden'
  } );

  newWindow.loadURL( config.url );

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
