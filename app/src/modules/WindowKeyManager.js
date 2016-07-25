document.addEventListener( 'keydown', keyDownHandler );

export const keyCodes = {
  esc   : 27,
  left  : 37,
  up    : 38,
  right : 39,
  down  : 40
};

const handlerKeys = Object.keys( keyCodes );
const handlers    = handlerKeys.reduce( ( handlers, key ) => {
  handlers[ key ] = {
    keyCode  : keyCodes[ key ],
    handlers : []
  };

  return handlers;
}, {} );


/**
 * Handle keydown events and fire only the last(!) attached event handler
 * for given keyCode
 *
 * @param {Object} event
 */
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


/**
 * Push a new event handler into the handlers queue
 *
 * @param {String}    key
 * @param {Funcation} fn
 */
function add( key, fn ) {
  handlers[ key ].handlers.push( fn );
}


/**
 * Remove handler from handlers queue
 *
 * @param {String}   key
 * @param {Function} fn
 */
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