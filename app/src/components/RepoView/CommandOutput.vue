
<style lang="scss">
  .script {
    &--actions {
      flex : 0 0;

      display : flex;
    }

    &--code {
      position : relative;
      height : 100%;

      padding : 0 .5em;

      > iframe {
        width : calc( 100% - 2em ) !important;
      }

      &.is-hidden {
        display : none;
      }
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

      top    : 2.5em;
      right  : 0;
      bottom : 0;
      left   : 0;

      padding : 2.5em 0 3em;

      overflow : hidden;

      background : var(--code-background);

      color : var(--code-color);

      &--footer {
        position : absolute;

        bottom : 0;
        left   : 0;
        right  : 0;
      }

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

        padding : .5em;

        background-color : var(--code-background);
      }
    }
  }
</style>

<template>
  <div class="script--output"
        v-key-tracker
        :on-left="close"
        :on-esc="close">
    <div class="script--output--header">
      <div class="u-flexVerticalCenter">
        <div v-if="commandStatus === 'running'" class="u-flexVerticalCenter" transition="trans-slideDown">
          <svg class="anim-infiniteSpinning" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </div>
      </div>
      <div class="u-marginLeftAuto">
        <button type="button" class="o-icon" @click="close()">
          <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
      </div>
    </div>
    <div id="terminal" class="script--code" v-bind:class="{ 'is-hidden': ! showHTerm }"></div>
    <div class="script--output--footer">
      <button v-if="commandStatus === 'running'" type="button" class="o-primaryBtn" @click="killScript">Kill it!</button>
      <button v-if="commandStatus === 'finished'" type="button" class="o-primaryBtn" @click="runScript()">Run again!</button>
    </div>
  </div>
</template>

<script>
  import { getAppSettings, getSessionOutput } from '../../vuex/getters';
  import { clearSessionData, execSessionCmd, setTerminalSize, writeSessionData } from '../../vuex/actions';
  import hterm from '../../modules/HTerm';

  export default {
    ready() {
      this.term.onTerminalReady = function() {
        var io = this.term.io.push();

        io.sendString = io.onVTKeystroke = ( key ) => {
          if ( key === '[D' ) {
            return this.close();
          }
        };

        io.onTerminalResize =  function( cols, rows ) {
          this.setTerminalSize( cols, rows );
        }.bind( this );
      }.bind( this );

      this.term.prefs_.set( 'background-color', '#2a333c' );
      this.term.prefs_.set( 'foreground-color', '#f1f1f1' );
      this.term.prefs_.set( 'cursor-color', 'rgba(100, 100, 10, 0)' );
      this.term.prefs_.set( 'send-encoding', 'raw' );
      this.term.prefs_.set( 'receive-encoding', 'raw' );
      this.term.prefs_.set( 'font-size', this.settings.terminalFontSize );
      this.term.prefs_.set( 'audible-bell-sound', '' );

      this.term.decorate( document.querySelector( '#terminal' ) );
      this.term.installKeyboard();

      this.$watch(
        'settings.terminalFontSize',
        ( value ) => this.term.prefs_.set( 'font-size', value )
      );

      // workaround some weird rendering transform/translate bug
      setTimeout( () => {
        this.$set( 'showHTerm', true );
        this.runScript();
      }, 50 );
    },

    data() {
      return {
        processExitStatus : null,

        commandStatus : false,
        showHTerm     : false,
        term          : this.term = new hterm.Terminal()
      };
    },

    props : [ 'currentCommand', 'repoName' ],

    methods : {
      close() {
        this.killScript();

        this.$dispatch( 'close-script', this.currentCommand );
      },

      handleData( data ) {
        this.term.io.writeUTF8( data );
      },

      handleScriptExit( code ) {
        if ( ! this.terminationStatus ) {
          this.$set( 'processExitStatus', code );
        }
      },

      killScript() {
        this.writeSessionData(
          '\u0003'
        );
        this.writeSessionData(
          '\u0003'
        );
      },

      runScript() {
        const { options, script } = this.currentCommand;
        const command = options.isCustom ?
                        `npm run ${ script.name }` :
                        `${script.command}`;

        this.term.wipeContents();

        this.execSessionCmd( command );
        this.$set( 'commandStatus', 'running' );
      }
    },

    vuex : {
      actions : {
        clearSessionData,
        execSessionCmd,
        setTerminalSize,
        writeSessionData
      },
      getters : {
        settings : getAppSettings,
        output   : getSessionOutput
      }
    },

    watch : {
      output : function ( value, oldValue ) {
        let newData = value.substr( oldValue.length );

        if ( /__FORREST_START__/.test( newData ) ) {
          if ( this.commandStatus === 'running' ) {
            newData = newData.replace(
              /__FORREST_START__/g,
              '\nFinished command.'
            );

            this.$set( 'commandStatus', 'finished' );

            if ( this.settings.displayNotifications ) {
              new Notification(
                `${ this.currentCommand.script.name } finished`,
                {
                  body : `-> ${ this.repoName }`
                }
              );
            }
          } else {
            newData = newData.replace(
              /__FORREST_START__/g,
              ''
            );
          }
        }

        this.handleData( newData );
      }
    }
  };
</script>
