<script>
  export default {
    bind() {
      let openExternal = this.vm.$electron.shell.openExternal;
      let url          = this.params.url;

      this.handler = ( event ) => {
        openExternal( url );

        event.preventDefault();
      };

      this.el.addEventListener( 'click', this.handler );
    },
    unbind() {
      this.el.removeEventListener( 'click', this.handler );
    },
    params : [ 'url' ]
  };
</script>
