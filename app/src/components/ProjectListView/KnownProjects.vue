<style scoped>
  button {
    background-color : var(--npm-red);
    display : block;

    width : 100%;

    border : none;

    padding : .5em;

    color : #fff;

    max-width : 15em;

    margin-left  : auto;
    margin-right : auto;
  }

  ul {
    list-style : none;
  }
</style>

<template>
  <ul>
    <li v-for="( index, repoPath ) in repoPaths" track-by="$index">
      <a v-link="{ path : `/projects/${ index }` }">
        {{ repoPath }}
      </a>
  </ul>
</template>

<script>
  import { getRepoPaths } from '../../vuex/getters';

  export default {
    vuex : {
      getters : {
        repoPaths : getRepoPaths
      }
    }
  };
</script>
