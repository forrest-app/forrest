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
  <div class="settings" transition="settings">
    <ul id="example-1" class="o-list">
      <li v-for="setting in configSettings" class="o-list--item">
        <label v-bind:class="{ 'u-flex u-flexSpaceBetween': setting.type === 'checkbox' }">
          <div>
            <div>{{ setting.label }}</div>

            <small v-if="setting.desc" class="o-small u-marginTopSmall">{{ setting.desc }}</small>
          </div>

          <input v-if="setting.type === 'text'" name="{{ setting.name }}" :value="settings[ setting.name ]" @input="updateValue">

          <div v-if="setting.type === 'checkbox'">
            <input name="{{ setting.name }}" :checked="settings[ setting.name ]" @change="updateValue" type="checkbox" class="u-visuallyHidden">

            <span class="o-checkbox u-marginTopSmall">
              <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </span>
          </div>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
  import { updateAppSetting } from '../../vuex/actions';
  import { getAppSettings, getConfigSettings } from '../../vuex/getters';

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
        settings       : getAppSettings,
        configSettings : getConfigSettings
      }
    }
  };
</script>
