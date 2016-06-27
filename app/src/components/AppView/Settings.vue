<style lang="scss" scoped>
  .settings {
    position : absolute;

    top    : 0;
    right  : 0;
    bottom : 0;
    left   : 0;

    z-index : 1;

    background-color : var(--npm-red);
    color : #fff;
    height : 100%;

    &--item, &--span {
      display : block;
    }

    &--span {
      margin-bottom : .5em;
    }

    &--input {
      display : block;
      width   : 100%;

      padding : .5em;
    }
  }

    /* always present */
  .settings-transition {
    transition :
      transform .2s ease-in-out;

    will-change : transform;
    transform   : translate( 0, 0 );
  }

  /* .settings-enter defines the starting state for entering */
  /* .settings-leave defines the ending state for leaving */
  .settings-enter, .settings-leave {
    transform : translate( 0, -100% );
  }
</style>

<template>
  <div class="settings paddingDefault" transition="settings">
    <label class="settings--item">
      <span class="settings--span">$PATH</span>
      <input class="settings--input" name="path" :value="settings.path" @input="updateValue">
    </label>
    <label class="settings--item">
      <span class="settings--span">Stay in Foreground</span>
      <input type="checkbox" name="alwaysOnTop" :checked="settings.alwaysOnTop" @change="updateValue">
    </label>
  </div>
</template>

<script>
  import { updateAppSetting } from '../../vuex/actions';
  import { getAppSettings } from '../../vuex/getters';

  export default {
    methods : {
      updateValue( event ) {
        let value = event.target.value;

        if ( event.target.type === 'checkbox' ) {
          value = event.target.checked;
        }

        this.updateAppSetting( event.target.name, value );
      }
    },
    vuex : {
      actions : {
        updateAppSetting : updateAppSetting
      },
      getters : {
        settings : getAppSettings
      }
    }
  };
</script>
