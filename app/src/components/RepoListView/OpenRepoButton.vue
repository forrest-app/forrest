<template>
  <button class="o-primaryBtn" type="button" v-on:click="openFileDialog">Add new Project</button>
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
