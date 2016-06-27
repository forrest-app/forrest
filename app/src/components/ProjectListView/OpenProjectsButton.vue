<style scoped>
  button {
    background-color : var(--npm-red);
    display : block;

    width : 100%;

    border : none;

    padding : 1em;

    color : #fff;

    margin-left  : auto;
    margin-right : auto;
  }
</style>

<template>
  <button type="button" v-on:click="openFileDialog">Add new Project</button>
</template>

<script>
  import { addRepoPath } from '../../vuex/actions';

  export default {
    vuex : {
      actions : {
        addRepoPath : addRepoPath
      }
    },
    methods : {
      openFileDialog : function() {
        this.$electron.remote.dialog.showOpenDialog( {
          title      : 'Open project',
          properties : [ 'openDirectory' ]
        }, ( repoPaths ) => {
          this.addRepoPath( repoPaths[ 0 ] );
        } );
      }
    }
  };
</script>
