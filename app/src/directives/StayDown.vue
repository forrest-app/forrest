<script>
  export default {
    bind() {
      let element = this.el;

      this.observer = new MutationObserver( ( mutations ) => {
        for ( var i = 0; i < mutations.length; i++ ) {
          element.scrollTop = element.scrollHeight;
        }
      } ) ;

      this.observer.observe( this.el, {
        childList     : true,
        subtree       : true,
        characterData : true
      } );
    },
    unbind() {
      this.observer.disconnect();
    }
  };
</script>
