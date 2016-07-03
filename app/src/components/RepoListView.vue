<style lang="scss" scoped>
  .logo {
    max-width : 5em;
  }

  .projectList {
    display : flex;
    flex-direction : column;
    height : 100%;

    &--container {
      flex : 1 0;
      overflow : auto;
    }
  }

  .projectList-transition {
    transition :
      transform .275s ease-in-out,
      opacity .3s ease-in-out;

    will-change : transform;
    transform   : translate( 0, 0 );
    opacity     : 1;
  }

  .projectList-enter, .projectList-leave {
    transform : translate( -100%, 0 );
    opacity   : .3;
  }
</style>

<template>
  <div class="projectList scrollContainer" transition="projectList">
    <known-repos class="projectList--container"></known-repos>
    <open-repo-button></open-repo-button>
  </div>
</template>

<script>
  import OpenRepoButton from './RepoListView/OpenRepoButton';
  import KnownRepos from './RepoListView/KnownRepos';
  import { getRepos } from '../vuex/getters';

  export default {
    components : {
      OpenRepoButton,
      KnownRepos
    },

    vuex : {
      getters : {
        repos : getRepos
      }
    },

    watch : {
      repos( val, oldVal ) {
        if ( oldVal.length < val.length ) {
          this.$router.go( { 'path' : `/projects/${ val.length - 1 }` } );
        }
      }
    }
  };
</script>
