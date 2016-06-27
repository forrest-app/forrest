'use strict'

const { app, ipcMain, BrowserWindow } = require( 'electron' );
const { spawn }                       = require( 'child_process' );
const path                            = require( 'path' );
const ElectronSettings                = require( 'electron-settings' );
const fs                              = require( 'fs' )

let mainWindow
let config = {}

let settings       = new ElectronSettings( { configFileName : 'npm-app' } );
let additionalPath = settings.get( 'app.path' );

if ( additionalPath ) {
  process.env.PATH = [ additionalPath, process.env.PATH ].join( ':' );
}

global.settings = settings.get();


// this should be easier here!
ipcMain.on( 'update-setting', ( event, name, setting ) => {
  settings.set( `app.${ name }`, setting );
  event.sender.send( 'updated-settings', settings.get( 'app' ) );
  global.settings = settings.get();

  if ( name === 'alwaysOnTop' ) {
    mainWindow.setAlwaysOnTop( setting );
  }
} );

ipcMain.on( 'add-repo', ( event, newRepoPath ) => {
  let repos = settings.get( 'repos' ) || [];

  fs.readFile( `${ newRepoPath }/package.json`, ( error, data ) => {
    // TODO put error handling here

    try {
      var packageJSON = JSON.parse( data );
    } catch( error ) {
      // TODO error handling
    }

    let url = packageJSON.repository &&
              packageJSON.repository.url &&
              packageJSON.repository.url.replace( /(git:\/\/|\.git)/g, '' );

    // does this piece of logic belong here?
    repos.push( {
      path        : newRepoPath,
      name        : packageJSON.name,
      description : packageJSON.description,
      url         : url
    } );

    settings.set( 'repos', repos );
    event.sender.send( 'updated-repos', repos );
    global.settings = settings.get();
  } );
} );


if ( process.env.NODE_ENV === 'development' ) {
  config     = require( '../config' );
  config.url = `http://localhost:${config.port}`;
} else {
  config.devtron = false;
  config.url     = `file://${__dirname}/dist/index.html`;
}

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
