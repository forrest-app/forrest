<script>
  export default {
    bind() {
      var onLeft  = this.params.onLeft;
      var onUp    = this.params.onUp;
      var onRight = this.params.onRight;
      var onDown  = this.params.onDown;

      this.handler = ( event ) => {
        if ( onLeft && event.keyCode === 37 ) {
          onLeft( event.target );

          event.preventDefault();
        }

        if ( onUp && event.keyCode === 38 ) {
          onUp( event.target );

          event.preventDefault();
        }

        if ( onRight && event.keyCode === 39 ) {
          onRight( event.target );

          event.preventDefault();
        }

        if ( onDown && event.keyCode === 40 ) {
          onDown( event.target );

          event.preventDefault();
        }
      };

      document.addEventListener( 'keydown', this.handler );
    },
    unbind() {
      this.el.removeEventListener( 'keydown', this.handler );
    },
    params : [ 'onDown', 'onRight', 'onLeft', 'onUp', 'onEsc', 'containerClass' ]
  };
</script>
