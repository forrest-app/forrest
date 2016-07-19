<style lang="scss" scoped>
  .c-script {
    padding : .5em;

    border-left : .25em solid transparent;

    &:focus {
      border-left-color : var(--npm-red);
      outline : none;
    }

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
  }
</style>

<template>
  <div class="c-script" tabindex="0">
    <div class="c-script--header">
      <div class="c-script--info">
        {{ script.name }}
      </div>
      <div class="c-script--actions">
        <button type="button" class="o-icon" v-if="script.docs" v-open-external :url="script.docs">
          <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z"/>
          </svg>
        </button>
        <button type="button" class="o-icon" @click="toggleVisibility()">
          <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
          </svg>
        </button>
        <button type="button" class="o-icon" @click="runScript( script, { isCustom : isCustom } )" aria-label="Run script" data-run-script>
          <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="c-script--details" v-if="detailsAreVisible">
      <code>
        <pre class="c-script--code">$ {{ script.command }}</pre>
      </code>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        detailsAreVisible : false
      };
    },

    methods : {
      toggleVisibility() {
        this.$set( 'detailsAreVisible', ! this.detailsAreVisible );
      }
    },

    props : [ 'script', 'runScript', 'isCustom' ]
  };
</script>
