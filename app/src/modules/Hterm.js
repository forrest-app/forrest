import { hterm, lib } from 'hterm-umdjs';

hterm.defaultStorage = new lib.Storage.Memory();

hterm.Terminal.prototype.overlaySize = function () {};

// passthrough all the commands that are meant to control
// hyperterm and not the terminal itself
const oldKeyDown = hterm.Keyboard.prototype.onKeyDown_;
hterm.Keyboard.prototype.onKeyDown_ = function ( event ) {
  if ( event.metaKey || event.altKey ) {
    return;
  }
  return oldKeyDown.call( this, event );
};


// fixes a bug in hterm, where the shorthand hex
// is not properly converted to rgb
//
// thx. @rauchg https://github.com/zeit/hyperterm/blob/master/lib/hterm.js#L91
lib.colors.hexToRGB = function ( arg ) {
  var hex16 = lib.colors.re_.hex16;
  var hex24 = lib.colors.re_.hex24;

  function convert ( hex ) {
    if ( hex.length === 4 ) {
      hex = hex.replace( hex16, function( h, r, g, b ) {
        return '#' + r + r + g + g + b + b;
      } );
    }
    var ary = hex.match( hex24 );
    if ( !ary ) return null;

    return 'rgb(' +
      parseInt( ary[ 1 ], 16 ) + ', ' +
      parseInt( ary[ 2 ], 16 ) + ', ' +
      parseInt( ary[ 3 ], 16 ) +
    ')';
  }

  if ( arg instanceof Array ) {
    for ( var i = 0; i < arg.length; i++ ) {
      arg[ i ] = convert( arg[ i ] );
    }
  } else {
    arg = convert( arg );
  }

  return arg;
};


export default hterm;
export { lib };
