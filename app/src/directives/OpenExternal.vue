<script>
  export default {
    update( value ) {
      if ( this.handler ) {
        this.el.removeEventListener( 'click', this.handler );
      }

      let openExternal = this.vm.$electron.shell.openExternal;

      this.handler = ( event ) => {
        openExternal( value );

        event.preventDefault();
      };

      this.el.addEventListener( 'click', this.handler );
    },

    unbind() {
      this.el.removeEventListener( 'click', this.handler );
    }
  };
</script>
