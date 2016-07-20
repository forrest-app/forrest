<style lang="scss">
  .c-project {
    &--header {
      position : relative;

      padding : 0 2.5em;

      border-bottom : 1px solid #ddd;

      &--btn {
        position : absolute;

        right : .75em;
        top   : .75em;
      }
    }

    &--headline {
      font-size : 1.125em;

      margin  : 0;
      padding : 0;

      text-align : center;

      color : var(--npm-red);

      line-height : 2.5em;

    }

    &--scriptsContainer {
      position : relative;
      height : calc( 100% - 2.8125em );
    }

    &--commandHeadline {
      padding : .5em;

      background : #fff;
      border     : none;
      border-top    : 1px solid var(--dark-bg-color);
      border-bottom : 1px solid var(--dark-bg-color);

      font-size : inherit;
      font-weight : normal;
      font-family : inherit;
    }
  }
</style>

<template>
  <div class="u-fullHeight"
        v-key-tracker
        :on-up="handleUp"
        :on-right="handleRight"
        :on-down="handleDown"
        :on-left="handleLeft">
    <div class="c-project--header">
      <h1 class="c-project--headline">{{ repo.name }}</h1>

      <button type="button" class="o-icon c-project--header--btn" @click="removeRepo" aria-label="Remove project from app">
        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </button>
    </div>
    <div class="c-project--scriptsContainer">
      <div class="scrollContainer">
        <h2 class="c-project--commandHeadline u-noBorderTop">Default commands</h2>

        <ul class="o-list">
          <li v-for="script in commands" class="o-list--item u-noPadding">
            <command :script="script" :run-script="runScript" :is-custom="false"></command>
        </ul>

        <h2 class="c-project--commandHeadline">Custom scripts</h2>

        <ul class="o-list">
          <li v-for="script in scripts" class="o-list--item u-noPadding">
            <command :script="script" :run-script="runScript" :is-custom="true"></command>
        </ul>
      </div>
    </div>

    <command-output v-if="currentCommand" :current-command="currentCommand" transition="t-slideUp--slideDown"></command-output>
  </div>
</template>

<script>
  import Command from './Command';
  import CommandOutput from './CommandOutput';
  import { getRepos, getDefaultCommands } from '../../vuex/getters';
  import { removeRepo as removeRepoAction } from '../../vuex/actions';

  export default {
    activate( done ) {
      this.$watch( 'scripts', () => {
        this.$set( 'scriptElements', this.$el.querySelectorAll( '.c-script' ) );
      } );

      this.$electron.remote.require( 'fs' ).readFile(
        `${ this.repo.path }/package.json`,
        ( error, data ) => {

          try {
            let packageJSON = JSON.parse( data );

            this.$set(
              'scripts',
              Object.keys( packageJSON.scripts ).map( ( key ) => {
                return {
                  name           : key,
                  command        : packageJSON.scripts[ key ],
                  detailsVisible : false
                };
              } )
            );

            this.$set( 'repo.name', packageJSON.name );
            done();
          } catch( error ) {
            this.error = error;
          }
        }
      );
    },

    ready() {
      document.addEventListener( 'keydown', this.handleKeyStrokes );
    },

    components : {
      Command,
      CommandOutput
    },

    data() {
      return {
        currentCommand : null,
        repo           : this.repos.find( repo => repo.name === this.repoName ),
        scripts        : [],
        scriptElements : null
      };
    },

    events : {
      'close-script' : function() {
        this.$set( 'currentCommand', null );
      }
    },

    methods : {
      handleUp( target ) {
        let index = [].indexOf.call( this.scriptElements, target );

        if ( index === -1 ) {
          index = this.scriptElements.length;
        }

        if ( index > 0 ) {
          this.scriptElements[ index - 1 ].focus();
        }
      },

      handleRight( target ) {
        if ( target.classList.contains( 'c-script' ) ) {
          target.querySelector( '[data-run-script]' ).click();
        }
      },

      handleDown( target ) {
        let index = [].indexOf.call( this.scriptElements, target );

        if ( index < this.scriptElements.length -1  ) {
          this.scriptElements[ index + 1 ].focus();
        }
      },

      handleLeft() {
        this.$router.go( {
          name  : 'repo-list-page',
          query : { selected : this.repo.name }
        } );
      },

      removeRepo() {
        this.$router.go( { name : 'repo-list-page' } );
        this.removeRepoAction( this.repo );
      },

      runScript( script, options ) {
        options.cwd = this.repo.path;

        this.$set(
          'currentCommand',
          {
            script  : script,
            options : options
          }
        );
      }
    },

    beforeDestroy() {
      document.removeEventListener( 'keydown', this.handleKeyStrokes );
    },

    props : [ 'repoName' ],

    vuex : {
      actions : {
        removeRepoAction : removeRepoAction
      },

      getters : {
        repos    : getRepos,
        commands : getDefaultCommands
      }
    }
  };
</script>
