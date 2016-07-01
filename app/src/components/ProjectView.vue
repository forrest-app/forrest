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
    <project :project-index="$route.params.projectIndex"></project>
  </div>
</template>

<script>
  import Project from './ProjectView/Project';

  export default {
    components : {
      Project
    }
  };
</script>
