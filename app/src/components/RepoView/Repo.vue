<style lang="scss">
  .c-project {
    &--header {
      position : relative;

      padding : 0 2.5em;

      border-bottom : 1px solid #ddd;

      &--btn {
        position : absolute;

        right : .75em;
        top   : 50%;

        transform : translate( 0, -50% );
      }
    }

    &--headline {
      font-size : 1.125em;

      margin  : 0;
      padding : .5em 0;

      text-align : center;

      color : var(--npm-red);

      line-height : 1.25em;

    }

    &--noScriptsMsg {
      display         : flex;
      align-items     : center;
      justify-content : space-between;

      > svg {
        width : 3em;
        height : 3em;

        margin-left : .5em;

        transform : rotate( .5turn );

        fill : var(--npm-red);
      }
    }

    &--scriptsContainer {
      position : relative;
      height : calc( 100% - 2.5em );
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
            <command :script="script" :script-class="scriptClass" :run-script="runScript" :is-custom="false"></command>
        </ul>

        <h2 class="c-project--commandHeadline">Custom scripts</h2>

        <ul class="o-list" >
          <li v-if="scripts.length" v-for="script in scripts" class="o-list--item u-noPadding">
            <command :script="script" :script-class="scriptClass" :run-script="runScript" :is-custom="true"></command>
          <li v-if="! scripts.length" class="o-list--item">
            <div class="c-project--noScriptsMsg">
              <div>
                <p class="o-paragraph">There are no custom scripts defined in your package.json.</p>
                <p class="o-paragraph u-noMarginBottom">If you rely on installed globals, <button type="button" class="o-linkBtn" v-open-external="'http://4waisenkinder.de/blog/2014/10/18/npm-2-dot-0-and-the-much-better-star-npm-run-star-command/'">you might wanna change that</button>.</p>
              </div>
              <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
              </svg>
            </div>
        </ul>
      </div>
    </div>

    <command-output v-if="currentCommand" :current-command="currentCommand" :repo-name="repo.name" transition="t-slideUp--slideDown"></command-output>
  </div>
</template>

<script>
  import Command from './Command';
  import CommandOutput from './CommandOutput';
  import { getRepos, getDefaultCommands } from '../../vuex/getters';
  import { execSessionCmd, removeRepo as removeRepoAction } from '../../vuex/actions';
  import { getParentWithClass } from '../../modules/DomUtils';

  export default {
    activate( done ) {
      this.$watch( 'scripts', () => {
        this.$set( 'scriptElements', this.$el.querySelectorAll( `.${ this.scriptClass }` ) );
      } );

      this.$electron.remote.require( 'fs' ).readFile(
        `${ this.repo.path }/package.json`,
        ( error, data ) => {

          try {
            let packageJSON = JSON.parse( data );

            this.$set(
              'scripts',
              Object.keys( packageJSON.scripts ).sort().map( ( key ) => {
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


      this.execSessionCmd(
        `cd ${ this.repo.path }`
      );
    },

    components : {
      Command,
      CommandOutput
    },

    data() {
      const repoName = decodeURIComponent( this.repoName );

      return {
        scriptClass    : 'c-script',
        currentCommand : null,
        repo           : this.repos.find( ( { name } ) => name === repoName ),
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
        let focusedCommand = target.classList.contains( this.scriptClass ) ?
                          target :
                          getParentWithClass( target, this.scriptClass );

        let index = [].indexOf.call( this.scriptElements, focusedCommand );

        if ( index === -1 ) {
          index = this.scriptElements.length;
        }

        if ( index > 0 ) {
          this.scriptElements[ index - 1 ].focus();
        }
      },

      handleRight( target ) {
        if ( target.classList.contains( this.scriptClass ) ) {
          target.querySelector( '[data-run-script]' ).click();
        }
      },

      handleDown( target ) {
        let focusedCommand = target.classList.contains( this.scriptClass ) ?
                          target :
                          getParentWithClass( target, this.scriptClass );

        let index = [].indexOf.call( this.scriptElements, focusedCommand );

        if ( index < this.scriptElements.length - 1  ) {
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
            script,
            options
          }
        );
      }
    },

    props : [ 'repoName' ],

    vuex : {
      actions : {
        execSessionCmd,
        removeRepoAction
      },

      getters : {
        repos    : getRepos,
        commands : getDefaultCommands
      }
    }
  };
</script>
