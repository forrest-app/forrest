<script>
  import WindowKeyManager from '../modules/WindowKeyManager';

  export default {
    bind() {
      this.mapping = {
        left  : 'onLeft',
        up    : 'onUp',
        right : 'onRight',
        down  : 'onDown',
        esc   : 'onEsc'
      };

      this.attachedHandlers = [];

      Object.keys( this.mapping ).forEach( ( key ) => {
        if ( this.params[ this.mapping[ key ] ] ) {
          WindowKeyManager.add( key, this.params[ this.mapping[ key ] ] );

          this.attachedHandlers.push( {
            key : key,
            fn  : this.params[ this.mapping[ key ] ]
          } );
        }
      }, this );
    },

    unbind() {
      this.attachedHandlers.forEach( handler => {
        WindowKeyManager.remove( handler.key, handler.fn );
      } );
    },
    params : [ 'onDown', 'onRight', 'onLeft', 'onUp', 'onEsc' ]
  };
</script>
