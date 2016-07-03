<style lang="scss" scoped>

  .project {
    &--headline {
      font-size : 1.125em;

      margin  : 0;
      padding : 0;

      text-align : center;

      color : var(--npm-red);

      line-height : 2.5em;

      border-bottom : 1px solid #ddd;
    }

    &--scriptsContainer {
      position : relative;
      height : calc( 100% - 2.8125em );
    }
  }

  .script {
    &--actions {
      flex : 0 0;

      display : flex;
    }

    &--code {
      font-size : .8em;

      padding : .5em;

      background-color : var(--code-background);
      color            : var(--code-color);

      border-radius : .25em;

      overflow : auto;
    }

    &--details {
      margin-top : .5em;
    }

    &--header {
      display        : flex;
      justify-content: space-between;

      align-items : center;
    }

    &--info {
      flex : 1 1;

      max-width : calc( 100% - 3em );
    }

    &--output {
      --svg-fill : var(--main-bg-color);

      position : absolute;

      top    : 2.75em;
      right  : 0;
      bottom : 0;
      left   : 0;

      padding-top : 2.5em;

      color : var(--code-color);

      &--header {
        position : absolute;

        right : 0;
        top   : 0;
        left  : 0;

        padding : .5em;

        display     : flex;
        align-items : center;

        background-color : var(--code-background);

        overflow : hidden;
      }

      &--btn {
        background      : none;
        color           : inherit;
        border          : none;
        font-size       : inherit;
        font-weight     : 400;
        line-height     : inherit;
        text-decoration : underline;
      }

      &--pre {
        height : 100%;
        border-radius : 0;
      }
    }

    &--runBtn, &--infoBtn, &--outputCloseBtn {
      width : 2.5em;
      height : 2.5em;

      border     : none;
      background : none;

      padding : .25em;

      svg {
        width : 100%;
        height : 100%;
      }

      &:hover {
        svg {
          fill : var(--npm-red);
        }
      }

      &:active {
        svg {
          fill : var(--npm-red-dark);
        }
      }
    }
  }

  .codeblock-transition {
    transition :
      transform .275s ease-in-out,
      opacity .3s ease-in-out;

    will-change : transform;
    transform   : translate( 0, 0 );
    opacity     : 1;
  }

  .codeblock-enter, .codeblock-leave {
    transform : translate( 0, 100% );
    opacity   : .3;
  }
</style>

<template>
  <div class="u-fullHeight">
    <h1 class="project--headline">{{ project.name }}</h1>
    <div class="project--scriptsContainer">
      <ul class="scrollContainer o-list">
        <li v-for="script in scripts" class="o-list--item">
          <div class="script">
            <div class="script--header">
              <div class="script--info">
                {{ script.name }}
              </div>
              <div class="script--actions">
                <button type="button" class="script--infoBtn" @click="toggleVisibility( script )">
                  <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
                  </svg>
                </button>
                <button type="button" class="script--runBtn" @click="runScript( script )" :disabled="process" aria-label="Run script">
                  <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0h24v24H0z" fill="none"/>
                      <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="script--details" v-if="script.detailsVisible">
              <code>
                <pre class="script--code">$ {{ script.command }}</pre>
              </code>
            </div>
          </div>
      </ul>
    </div>

    <div class="script--output" v-if="process" transition="codeblock">
      <div class="script--output--header">
        <div class="u-flexVerticalCenter">
          <span class="u-marginRightSmall">Status:</span>

          <div v-if="processStatus === null" class="u-flexVerticalCenter" transition="trans-slideDown">
            <svg class="anim-infiniteSpinning" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>

            <button type="button" class="script--output--btn u-marginLeftSmall" @click="killScript" aria-label="Cancel script">Kill it!</button>
          </div>

          <div v-if="processStatus === 0" class="u-flexVerticalCenter" transition="trans-slideDown">
            <svg  class="u-fillGreen" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
            </svg>

            <button type="button" class="script--output--btn u-marginLeftSmall" @click="runScript( lastScript )" aria-label="Run script again">Run again!</button>
          </div>

          <div v-if="processStatus > 0" class="u-flexVerticalCenter" transition="trans-slideDown">
            <svg class="u-fillRed" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>
            </svg>

            <span class="u-marginLeftSmall">(Code {{ processStatus }})</span>

            <button type="button" class="script--output--btn u-marginLeftSmall" @click="runScript( lastScript )" aria-label="Run script again">Run again!</button>
          </div>

        </div>
        <div class="u-marginLeftAuto">
          <button type="button" class="script--outputCloseBtn" @click="closeScript">
            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </button>
        </div>
      </div>
      <code>
        <pre class="script--output--pre script--code">{{ output }}</pre>
      </code>
    </div>
  </div>
</template>

<script>
  import { getRepos, getAppSettings } from '../../vuex/getters';
  import displayNotification from 'display-notification';

  export default {
    activate( done ) {
      this.spawn = this.$electron.remote.require( 'child_process' ).spawn;

      this.$electron.remote.require( 'fs' ).readFile(
        `${ this.project.path }/package.json`,
        ( error, data ) => {
          try {
            let packageJSON = JSON.parse( data );

            this.scripts = Object.keys( packageJSON.scripts ).map( ( key ) => {
              return {
                name           : key,
                command        : packageJSON.scripts[ key ],
                detailsVisible : false
              };
            } );
            this.project.name = packageJSON.name;
          } catch( error ) {
            this.error = error;
          }

          done();
        }
      );
    },
    data() {
      return {
        scripts       : [],
        spawn         : null,
        process       : null,
        processStatus : null,
        project       : {
          path : this.repos[ this.projectIndex ].path,
          name : null
        },
        output : ''
      };
    },
    methods : {
      closeScript() {
        this.process    = null;
        this.lastScript = null;
      },
      handleScriptExit( code ) {
        this.processStatus = code;

        if ( this.settings.displayNotifications ) {
          displayNotification( {
            title : `'${ this.lastScript.name }' finished`,
            text  : this.processStatus > 0 ? 'It failed.' : 'It succeeded'
          } );
        }
      },
      runScript( script ) {
        this.output = '';

        this.lastScript    = script;
        this.processStatus = null;
        this.process       = this.spawn(
          'npm',
          [ 'run', script.name ],
          {
            cwd : this.project.path
          }
        );

        this.process.stdout.on( 'data', ( data ) => {
          this.output += data;
        } );

        this.process.stderr.on( 'data', ( data ) => {
          this.output += data;
        } );

        // TODO clean this up.
        this.process.on( 'close', this.handleScriptExit );
        this.process.on( 'exit', this.handleScriptExit );
      },
      killScript() {
        if ( this.process ) {
          this.process.kill( 'SIGTERM' );
        }
      },
      toggleVisibility( script ) {
        script.detailsVisible = ! script.detailsVisible;
      }
    },
    props : [ 'projectIndex' ],
    vuex  : {
      getters : {
        repos    : getRepos,
        settings : getAppSettings
      }
    }
  };
</script>
