const { app }          = require( 'electron' );
const { EventEmitter } = require( 'events' );
const defaultShell     = require( 'default-shell' );

let spawn = require( 'child_pty' ).spawn;

module.exports = class Session extends EventEmitter {
  constructor () {
    super();

    const baseEnv = Object.assign( {}, process.env, {
      LANG : app.getLocale().replace( '-', '_' ) + '.UTF-8',
      TERM : 'xterm-256color'
    } );

    this.pty = spawn( defaultShell, [ '--login' ], {
      env : baseEnv
    } );

    this.pty.stdout.on( 'data', ( data ) => {
      this.emit( 'data', data.toString( 'utf8' ) );
    } );

    this.pty.on( 'exit', () => {
      if ( ! this.ended ) {
        this.ended = true;
        this.emit( 'exit' );
      }
    } );

    this.write( 'PS1=__FORREST_START__\nRPROMPT=\'\'\n' );

    this.shell = defaultShell;
  }

  exit () {
    this.destroy();
  }

  write ( data ) {
    this.pty.stdin.write( data );
  }

  resize ( { cols: columns, rows } ) {
    try {
      this.pty.stdout.resize( { columns, rows } );
    } catch ( error ) {
      console.error( error.stack );
    }
  }

  destroy () {
    try {
      this.pty.kill( 'SIGHUP' );
    } catch ( error ) {
      console.error( 'exit error', error.stack );
    }
    this.emit( 'exit' );
    this.ended = true;
  }
};
