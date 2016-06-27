<style lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Lato:300);

  :root {
    --npm-red           : #cb3837;
    --npm-red-dark      : #ab1817;

    --main-bg-color : #f1f1f1;

    --header-background : #2a333c;

    --code-background : #2a333c;
    --code-color      : #f1f1f1;

    --svg-fill : #2a333c;
  }

  * {
    margin: 0;
    padding: 0;

    box-sizing : border-box;
  }

  html,
  body {
    height: 100%;

  }

  body {
    padding : 0;
    background: var(--main-bg-color);
    font-family: Lato, Helvetica, sans-serif;

    display : flex;

    flex-direction : column;
  }

  main {
    height : 100%;
    position : relative;

    overflow : hidden;

    > div {
      position : absolute;

      top    : 0;
      right  : 0;
      bottom : 0;
      left   : 0;

      overflow : auto;
    }
  }

  ul {
    list-style : none;

    margin  : 0;
    padding : 0 .5em;
  }

  li {
    padding : .5em 0;

    & + li {
      border-top : 1px solid #ddd;
    }
  }

  svg {
    fill : var(--svg-fill);
  }

  .verticalDefaultMargin {
    margin-top : 1em;
    margin-bottom : 1em;
  }

  .paddingDefault {
    padding : 1em;
  }
</style>

<template>
  <header-bar></header-bar>
  <main>
    <settings v-if="showSettings"></settings>
    <router-view v-on:activate="toggleSettings( false )"></router-view>
  </main>
</template>

<script>
  import HeaderBar from './components/AppView/HeaderBar';
  import Settings from './components/AppView/Settings';
  import store from 'src/vuex/store';

  export default {
    components : {
      HeaderBar,
      Settings
    },
    data() {
      return {
        showSettings : false
      };
    },
    events : {
      'toggle-settings' : function( event, toggleSettings ) {
        this.toggleSettings( toggleSettings );
      }
    },
    methods : {
      toggleSettings( showSettings ) {
        if ( showSettings !== undefined ) {
          this.showSettings = showSettings;
        } else {
          this.showSettings = ! this.showSettings;
        }
      }
    },
    ready() {
      this.$router.beforeEach( () => {
        this.toggleSettings( false );
      } );
    },
    route : {
      activate() {
        debugger;
      }
    },
    store
  };
</script>
