<style lang="scss" scoped>
  pre {
    font-size : .8em;

    padding : .5em;

    background-color : var(--code-background);
    color            : var(--code-color);

    border-radius : .25em;

    overflow : auto;
  }

  .project {
    &--headline {
      font-size : 1.125em;

      height : 2em;

      margin : .4444em .44444em 0;
      padding : 0 0 .44444em;

      text-align : center;

      color : var(--npm-red);

      border-bottom : 1px solid #ddd;
    }
  }

  .script {
    &--actions {
      flex : 0 0;

      display : flex;
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

      pre {
        overflow : auto;
      }
    }

    &--output {
      position : absolute;

      top    : 2.5em;
      right  : 0;
      bottom : 0;
      left   : 0;

      &--actions {
        position : absolute;

        right : .5em;
        top   : .5em;
      }

      &--pre {
        height : 100%;

        padding-top : 3em;

        border-radius : 0;
      }
    }

    &--runBtn, &--infoBtn {
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
  <div>
    <h1 class="project--headline">{{ project.name }}</h1>
    <ul>
      <li v-for="script in scripts">
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
              <pre>$ {{ script.command }}</pre>
            </code>
          </div>
        </div>
    </ul>

    <div class="script--output" v-if="process" transition="codeblock">
      <div class="script--output--actions">
        <button  type="button" @click="killScript">Kill it</button>
        <button  type="button" class="script--outputCloseBtn" @click="closeScript">Close script</button>
      </div>
      <code>
        <pre class="script--output--pre">{{ output }}</pre>
      </code>
    </div>
  </div>
</template>

<script>
  import { getRepoPaths } from '../../vuex/getters';

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
          path : this.repoPaths[ this.projectIndex ],
          name : null
        },
        output : ''
      };
    },
    methods : {
      closeScript() {
        this.process = null;
      },
      runScript( script ) {
        this.output = '';

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
        this.process.on( 'close', ( code ) => {
          this.processStatus = code === 0 ? 'success' : 'error';
        } );

        this.process.on( 'exit', ( code ) => {
          this.processStatus = code === 0 ? 'success' : 'error';
        } );
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
        repoPaths : getRepoPaths
      }
    }
  };
</script>
