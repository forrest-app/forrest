<style lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Lato:300,300italic);
  @import './styles/objects/btn';
  @import './styles/objects/checkbox';
  @import './styles/objects/input';
  @import './styles/objects/lists';
  @import './styles/objects/small';
  @import './styles/transitions/slide-right--slide-left';
  @import './styles/transitions/slide-up--slide-down';
  @import './styles/transitions/slide-down--slide-up';
  @import './styles/utils';


  :root {
    --npm-red           : #cb3837;
    --npm-red-dark      : #ab1817;

    --main-bg-color : #f1f1f1;
    --dark-bg-color : #e1e1e1;

    --header-background : #2a333c;
    --header-height     : 10em;

    --code-background         : #2a333c;
    --code-color              : #f1f1f1;

    --svg-fill       : #2a333c;
    --svg-fill-red   : var(--npm-red);
    --svg-fill-green : #399039;
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
    height   : 100%;
    position : relative;
    overflow : hidden;

    .scrollContainer {
      position : absolute;

      top    : 0;
      right  : 0;
      bottom : 0;
      left   : 0;

      overflow : auto;
    }
  }

  svg {
    fill : var(--svg-fill);
  }

  .verticalDefaultMargin {
    margin-top : 1em;
    margin-bottom : 1em;
  }

  ::-webkit-scrollbar {
    height: .75rem;
    width: .75rem;
}
  ::-webkit-scrollbar-thumb {
    // background-clip  : padding-box;
    // background-color : var(--npm-red-dark);
    box-shadow   : inset 0 0 0 .5rem var(--npm-red);
    border           : .25rem solid transparent;
  }

  ::-webkit-scrollbar-corner {
    background : transparent;
  }

  @keyframes infinite-spinning {
    from {
      transform: rotate( 0deg );
    }
    to {
      transform: rotate( 360deg );
    }
  }

  .anim-infiniteSpinning {
    animation: infinite-spinning 1.25s infinite;
  }

  .trans-slideDown {
    &-transition {
      transition :
        transform .275s ease-in-out,
        opacity .3s ease-in-out;

      will-change : transform;
      transform   : translate( 0, 0 );
      opacity     : 1;
    }

    &-enter, &-leave {
      transform : translate( 0, -75% );
      opacity   : .125;
    }

    &-leave {
      transition : none;
    }
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
