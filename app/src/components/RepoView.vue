<style scoped>
  .project {
    height : 100%;
  }

  .project-transition {
    transition :
      transform .275s ease-in-out,
      opacity .3s ease-in-out;

    will-change : transform;
    transform   : translate( 0, 0 );
    opacity     : 1;
  }

  .project-enter, .project-leave {
    transform : translate( 100%, 0 );
    opacity   : .3;
  }
</style>

<template>
  <div class="project" transition="project">
    <repo :repo-name="$route.params.repoName"></repo>
  </div>
</template>

<script>
  import Repo from './RepoView/Repo';

  export default {
    components : {
      Repo
    }
  };
</script>
