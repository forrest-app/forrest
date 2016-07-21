
<style lang="scss" scoped>
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

      top    : 2.5em;
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
  }
</style>

<template>
  <div class="script--output"
        v-key-tracker
        :on-left="close"
        :on-esc="close">
    <div class="script--output--header">
      <div class="u-flexVerticalCenter">
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
        <button type="button" class="o-icon" @click="close()">
          <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
      </div>
    </div>
    <code v-bind:style="{ fontSize : `${ settings.terminalFontSize }px` || 'inherit'  }">
      <pre class="script--output--pre script--code" v-stay-down>{{ output }}</pre>
    </code>
  </div>
</template>

<script>
  import { getAppSettings } from '../../vuex/getters';

  export default {
    created() {
      this.runScript();
    },

    data() {
      return {
        exec          : this.$electron.remote.require( 'child_process' ).exec,
        process       : null,
        processStatus : null,
        processCmd    : null,
        lastCommand   : null,
        output        : ''
      };
    },

    props : [ 'currentCommand' ],

    methods : {
      close() {
        this.killScript();

        this.$dispatch( 'close-script' );
      },

      handleData( data ) {
        this.$set( 'output', this.output + data );
      },

      handleScriptExit( code ) {
        this.$set( 'processStatus', code );

        if ( this.settings.displayNotifications ) {
          new Notification(
            `'${ this.currentCommand.script.name }' ${ code === 0 ? 'succeeded' : 'failed' }`,
            {
              body : `${ code === 0 ? '(•◡•)/' : `◔̯◔ Failure with code ${ code }` }`
            }
          );
        }
      },

      killScript() {
        if ( this.process ) {
          this.process.kill( 'SIGTERM' );
        }
      },

      runScript() {
        this.$set( 'output', '' );
        this.$set( 'processStatus', null );

        this.processCmd = this.currentCommand.options.isCustom ?
           `npm run ${ this.currentCommand.script.name }` :
           this.currentCommand.script.command;

        this.$set( 'process', this.exec(
          this.processCmd,
          {
            cwd : this.currentCommand.options.cwd
          }
        ) );

        this.process.stdout.on( 'data', this.handleData );
        this.process.stderr.on( 'data', this.handleData );

        this.process.on( 'error', this.handleScriptExit );
        this.process.on( 'close', this.handleScriptExit );
        this.process.on( 'exit', this.handleScriptExit );
      }
    },

    vuex : {
      getters : {
        settings : getAppSettings
      }
    }
  };
</script>
