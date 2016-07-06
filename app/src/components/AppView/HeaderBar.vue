<style lang="scss" scoped>
  header {
    display     : flex;
    align-items : center;

    background-color : var(--header-background);

    margin : 0;
    padding : .5em .5em;
  }

  .logo {
    display : block;
    margin : 0 auto;
    padding : .25em .5em;

    color : var(--main-bg-color);

    border : 1px solid var(--main-bg-color);

    line-height    : 1;
    letter-spacing : 1px;
  }

  .homeIcon, .settingsIcon {
    fill : #fff;

    &:hover {
      fill : var(--npm-red);
    }

    &:active {
      fill : var(--npm-red-dark);
    }
  }

  .settingsBtn {
    border : none;
    background : transparent;
  }

  .settingsIcon {
    transition : transform 375ms ease-in-out;
    &:hover {
      transform : rotate( 180deg );
    }
  }
</style>

<template>
  <header class="u-paddingDefault">
    <a v-link="{ name : 'repo-list-page' }" aria-label="Go home" @click="toggleSettings( false )">
      <svg class="homeIcon" height="24" viewBox="0 0 24 24" width="24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </a>
    <div class="logo">
      Forrest
    </div>
    <button class="settingsBtn" aria-label="Go to settings" @click="toggleSettings()">
      <svg class="settingsIcon" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
      </svg>
    </button>
  </header>
</template>

<script>
  export default {
    methods : {
      toggleSettings( showSettings ) {
        this.$dispatch( 'toggle-settings', showSettings );
      }
    }
  };
</script>
