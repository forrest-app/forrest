
document.addEventListener( 'keydown', keyDownHandler );

let handlers = {
  left : {
    keyCode  : 37,
    handlers : []
  },
  up : {
    keyCode  : 38,
    handlers : []
  },
  right : {
    keyCode  : 39,
    handlers : []
  },
  down : {
    keyCode  : 40,
    handlers : []
  },
  esc : {
    keyCode  : 27,
    handlers : []
  }
};
let handlerKeys = Object.keys( handlers );

function keyDownHandler( event ) {
  handlerKeys.forEach( key => {
    if (
      handlers[ key ].keyCode === event.keyCode &&
      handlers[ key ].handlers.length
    ) {
      handlers[ key ].handlers[ handlers[ key ].handlers.length - 1 ]( event.target );

      event.preventDefault();
    }
  } );
}

function add( key, fn ) {
  handlers[ key ].handlers.push( fn );
}

function remove( key, fn ) {
  handlers[ key ].handlers = handlers[ key ].handlers.reduce( ( handlers, handler ) => {
    if ( handler !== fn ) {
      handlers.push( handler );
    }

    return handlers;
  }, [] );
}

export default {
  add,
  remove
};