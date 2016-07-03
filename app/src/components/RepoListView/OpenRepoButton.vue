<style scoped>
  button {
    background-color : var(--npm-red);
    display : block;

    width : 100%;

    border : none;

    padding : .5em;

    color       : var(--main-bg-color);
    font-size   : inherit;
    font-family : inherit;

    margin-left  : auto;
    margin-right : auto;
  }
</style>

<template>
  <button type="button" v-on:click="openFileDialog">Add new Project</button>
</template>

<script>
  import { addRepoWithPath } from '../../vuex/actions';

  export default {
    vuex : {
      actions : {
        addRepoWithPath : addRepoWithPath
      }
    },
    methods : {
      openFileDialog() {
        this.$electron.remote.dialog.showOpenDialog( {
          title      : 'Open project',
          properties : [ 'openDirectory' ]
        }, ( repoPaths ) => {
          if ( repoPaths ) {
            this.addRepoWithPath( repoPaths[ 0 ] );
          }
        } );
      }
    }
  };
</script>
