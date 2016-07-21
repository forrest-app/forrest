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

    &--version {
      font-size : 1.25em
    }
  }
</style>

<template>
  <div class="c-settings"
        transition="t-slideDown--slideUp"
        v-key-tracker
        :on-esc="handleEsc"
        :on-up="noob"
        :on-right="noob"
        :on-down="noob"
        :on-left="noob">
    <ul class="o-list">
      <li class="o-list--item">
        <div class="u-marginBottomSmall">Detected node and npm versions</div>
        <div class="u-flexVerticalCenter">
          <div class="u-flexVerticalCenter">
            <div class="o-icon o-icon__fillBright u-marginRightSmall">
              <svg width="256" height="289" viewBox="0 0 256 289" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                <path d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.156.796-.53 1.856-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.59 1.59-2.915V83.08c0-1.325-.53-2.385-1.59-2.915l-105.74-60.953c-1.06-.53-2.385-.53-3.18 0L20.405 80.166c-1.06.53-1.59 1.855-1.59 2.915v122.17c0 1.06.53 2.385 1.59 2.915l28.887 16.695c15.636 7.95 25.44-1.325 25.44-10.6V93.68c0-1.59 1.326-3.18 3.181-3.18h13.516c1.59 0 3.18 1.325 3.18 3.18v120.58c0 20.936-11.396 33.126-31.272 33.126-6.095 0-10.865 0-24.38-6.625l-27.827-15.9C4.24 220.885 0 213.465 0 205.515V83.346C0 75.396 4.24 67.976 11.13 64L116.87 2.783c6.625-3.71 15.635-3.71 22.26 0L244.87 64C251.76 67.975 256 75.395 256 83.346v122.17c0 7.95-4.24 15.37-11.13 19.345L139.13 286.08c-3.445 1.59-7.42 2.385-11.13 2.385zm32.596-84.009c-46.377 0-55.917-21.2-55.917-39.221 0-1.59 1.325-3.18 3.18-3.18h13.78c1.59 0 2.916 1.06 2.916 2.65 2.12 14.045 8.215 20.936 36.306 20.936 22.261 0 31.802-5.035 31.802-16.96 0-6.891-2.65-11.926-37.367-15.372-28.886-2.915-46.907-9.275-46.907-32.33 0-21.467 18.02-34.187 48.232-34.187 33.921 0 50.617 11.66 52.737 37.101 0 .795-.265 1.59-.795 2.385-.53.53-1.325 1.06-2.12 1.06h-13.78c-1.326 0-2.65-1.06-2.916-2.385-3.18-14.575-11.395-19.345-33.126-19.345-24.38 0-27.296 8.48-27.296 14.84 0 7.686 3.445 10.07 36.306 14.31 32.597 4.24 47.967 10.336 47.967 33.127-.265 23.321-19.345 36.571-53.002 36.571z"/>
              </svg>
            </div>
            <span class="c-settings--version">{{ nodeVersion }}</span>
          </div>
          <div class="u-flexVerticalCenter u-marginLeftAuto">
            <span class="c-settings--version">{{ npmVersion }}</span>
            <div class="o-icon o-icon__fillBright o-icon__npm u-marginLeftSmall u-negativeBottomMarginTiny">
              <svg xmlns="http://www.w3.org/2000/svg" width="540" height="210" viewBox="0 0 18 7">
                <path class="o-pathNoFill" d="M0 0h18v6H9v1H5V6H0V0zm1 5h2V2h1v3h1V1H1v4zm5-4v5h2V5h2V1H6zm2 1h1v2H8V2zm3-1v4h2V2h1v3h1V2h1v3h1V1h-6z"/>
                <path d="M1 5h2V2h1v3h1V1H1zM6 1v5h2V5h2V1H6zm3 3H8V2h1v2zM11 1v4h2V2h1v3h1V2h1v3h1V1z"/>
              </svg>
            </div>
          </div>
        </div>
      <li v-for="setting in configSettings" class="o-list--item">
        <label v-bind:class="{ 'u-flex u-flexSpaceBetween': setting.type === 'checkbox' }">
          <div>
            <div>{{ setting.label }}</div>

            <small v-if="setting.desc" class="o-small u-marginTopSmall">{{ setting.desc }}</small>
          </div>

          <input v-if="setting.type === 'text'" name="{{ setting.name }}" :value="settings[ setting.name ]" @input="updateValue" class="o-input u-marginTopSmall">

          <input v-if="setting.type === 'number'" name="{{ setting.name }}" type="{{ setting.type }}" :value="settings[ setting.name ]" @input="updateValue" class="o-input u-marginTopSmall">

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
    created() {
      this.evaluateSystemVersions();

      this.$watch( 'settings.path', () => this.evaluateSystemVersions() );
    },

    data() {
      return {
        exec        : this.$electron.remote.require( 'child_process' ).exec,
        nodeVersion : null,
        npmVersion  : null
      };
    },

    methods : {
      evaluateSystemVersions() {
        this.exec(
          'node --version',
          ( error, version ) => {
            if ( error ) {
              return this.$set( 'nodeVersion', 'N/A' );
            }
            this.$set( 'nodeVersion', version );
          }
        );

        this.exec(
          'npm --version',
          ( error, version ) => {
            if ( error ) {
              return this.$set( 'npmVersion', 'N/A' );
            }
            this.$set( 'npmVersion', version );
          }
        );
      },

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
