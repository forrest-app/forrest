'use strict'

const { app, ipcMain, BrowserWindow } = require( 'electron' );
const { spawn }                       = require( 'child_process' );
const path                            = require( 'path' );
const fs                              = require( 'fs' )

let mainWindow
let config = {}

if ( process.env.NODE_ENV === 'development' ) {
  config     = require( '../config' );
  config.url = `http://localhost:${config.port}`;
} else {
  config.devtron = false;
  config.url     = `file://${__dirname}/dist/index.html`;
}

ipcMain.on( 'updatedAppSetting', ( event, key, value ) => {
  if ( key === 'path' ) {
    process.env.PATH = value;
  }

  if ( key === 'alwaysOnTop' ) {
    mainWindow.setAlwaysOnTop( value );
  }
} );



function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow( {
    height : 500,
    width  : 300
  } );

  mainWindow.loadURL( config.url )
  if ( process.env.NODE_ENV === 'development' ) {
    mainWindow.webContents.openDevTools( { mode : 'undocked' } );
  }

  mainWindow.on( 'closed', () => {
    mainWindow = null;
  } );

  if ( config.devtron ) {
    BrowserWindow.addDevToolsExtension( path.join( __dirname, '../node_modules/devtron') )
  } else {
    BrowserWindow.removeDevToolsExtension( 'devtron' );
  }

  console.log( 'mainWindow opened' );
}

app.on( 'ready', createWindow );

app.on( 'window-all-closed', () => {
  if ( process.platform !== 'darwin' ) {
    app.quit();
  }
} )

app.on( 'activate', () => {
  if ( mainWindow === null ) {
    createWindow();
  }
} )
