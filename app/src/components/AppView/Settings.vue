<style lang="scss" scoped>
  .c-settings {
    position : absolute;

    top    : 0;
    right  : 0;
    bottom : 0;
    left   : 0;

    z-index : 1;

    background-color : var(--npm-red);
    color : #fff;
    height : 100%;

    &--number {
      display : flex;

      align-items : center;
    }

    &--version {
      font-size : 1.25em
    }
  }
</style>

<template>
  <div class="c-settings scrollContainer"
        transition="t-slideDown--slideUp"
        v-key-tracker
        :on-esc="handleEsc"
        :on-up="noob"
        :on-right="noob"
        :on-down="noob"
        :on-left="noob">
    <ul class="o-list">
      <li v-for="setting in configSettings" class="o-list--item">
        <label v-bind:class="{ 'u-flex u-flexSpaceBetween': setting.type === 'checkbox' }">
          <div>
            <div>{{ setting.label }}</div>

            <small v-if="setting.desc" class="o-small u-marginTopSmall">{{ setting.desc }}</small>
          </div>

          <input v-if="setting.type === 'text'" name="{{ setting.name }}" :value="settings[ setting.name ]" @input="updateValue" class="o-input u-marginTopSmall">

          <div v-if="setting.type === 'number'" class="c-settings--number">
            <input name="{{ setting.name }}" type="{{ setting.type }}" :value="settings[ setting.name ]" @input="updateValue" @keydown="updateValue" class="o-input u-marginTopSmall">
            <span class="u-marginLeftSmall">{{ setting.unit }}</span>
          </div>

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
  import { keyCodes } from '../../modules/WindowKeyManager';

  export default {
    data() {
      return {
        keyCodes : keyCodes
      };
    },

    methods : {
      handleEsc() {
        this.$dispatch( 'toggle-settings', false );
      },

      noob() {
        // just to overwrite the other event listeners that
        // might be attached already
      },

      updateValue( event ) {
        let value = event.target.value;

        if ( event.target.type === 'checkbox' ) {
          value = event.target.checked;
        }

        if ( event.target.type === 'number' ) {
          if ( event.keyCode === this.keyCodes.up ) {
            value = ++value;
          }

          if ( event.keyCode === this.keyCodes.down ) {
            value = --value;
          }
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
