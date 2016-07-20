<style lang="scss">
  .c-project {
    position : relative;
    display  :block;

    padding : .5em 2em .5em .5em;

    border-left : .25em solid transparent;

    color : inherit;
    text-decoration : none;

    &:focus {
      border-left-color : var(--npm-red);
      outline : none;
    }

    &--link {
      position : absolute;

      display         : flex;
      align-items     : center;
      justify-content : center;

      top    : 0;
      right  : 0;
      bottom : 0;

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

    &--zeroContainer {
      width : 75%;
      height : 75%;

      max-width : 15em;
    }

    &--zeroIcon {
      width : 100%;
      height : 100%;
    }

    &--zeroText {
      text-align : center;
      font-size : 2em;
    }
  }
</style>

<template>
  <div v-bind:class="{ 'u-flexCenter' : ! repos || ! repos.length }"
        v-key-tracker
        :on-up="handleUp"
        :on-right="handleRight"
        :on-down="handleDown">
    <div v-if="! repos || ! repos.length" class="c-project--zeroContainer">
      <svg class="c-project--zeroIcon" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z" fill="none"/>
          <path d="M16.14 12.5c0 1-.1 1.85-.3 2.55-.2.7-.48 1.27-.83 1.7-.36.44-.79.75-1.3.95-.51.2-1.07.3-1.7.3-.62 0-1.18-.1-1.69-.3-.51-.2-.95-.51-1.31-.95-.36-.44-.65-1.01-.85-1.7-.2-.7-.3-1.55-.3-2.55v-2.04c0-1 .1-1.85.3-2.55.2-.7.48-1.26.84-1.69.36-.43.8-.74 1.31-.93C10.81 5.1 11.38 5 12 5c.63 0 1.19.1 1.7.29.51.19.95.5 1.31.93.36.43.64.99.84 1.69.2.7.3 1.54.3 2.55v2.04zm-2.11-2.36c0-.64-.05-1.18-.13-1.62-.09-.44-.22-.79-.4-1.06-.17-.27-.39-.46-.64-.58-.25-.13-.54-.19-.86-.19-.32 0-.61.06-.86.18s-.47.31-.64.58c-.17.27-.31.62-.4 1.06s-.13.98-.13 1.62v2.67c0 .64.05 1.18.14 1.62.09.45.23.81.4 1.09s.39.48.64.61.54.19.87.19c.33 0 .62-.06.87-.19s.46-.33.63-.61c.17-.28.3-.64.39-1.09.09-.45.13-.99.13-1.62v-2.66z"/>
      </svg>
      <div class="c-project--zeroText">repos so far</div>
    </div>
    <ul v-if="repos && repos.length" class="o-list">
      <li v-for="repo in repos" track-by="path" class="o-list--item u-noPadding u-positionRelative" transition="t-slideRight--slideLeft">
        <a id="{{ repo.name }}" class="c-project" v-link="{ path : `/repos/${ repo.name }` }">
          <div class="c-project--name">
            <span>{{ repo.name }}</span>
            <button type="button" v-if="repo.url" v-open-external :url="repo.url" class="o-icon" aria-label="Open project on GitHub" title="Open project on GitHub">
              <svg x="0px" y="0px" width="438.549px" height="438.549px" viewBox="0 0 438.549 438.549">
                <g>
                  <path d="M409.132,114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736,15.166,259.057,5.365,219.271,5.365
                    c-39.781,0-76.472,9.804-110.063,29.408c-33.596,19.605-60.192,46.204-79.8,79.8C9.803,148.168,0,184.854,0,224.63
                    c0,47.78,13.94,90.745,41.827,128.906c27.884,38.164,63.906,64.572,108.063,79.227c5.14,0.954,8.945,0.283,11.419-1.996
                    c2.475-2.282,3.711-5.14,3.711-8.562c0-0.571-0.049-5.708-0.144-15.417c-0.098-9.709-0.144-18.179-0.144-25.406l-6.567,1.136
                    c-4.187,0.767-9.469,1.092-15.846,1c-6.374-0.089-12.991-0.757-19.842-1.999c-6.854-1.231-13.229-4.086-19.13-8.559
                    c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559
                    c-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-0.951-2.568-2.098-3.711-3.429c-1.142-1.331-1.997-2.663-2.568-3.997
                    c-0.572-1.335-0.098-2.43,1.427-3.289c1.525-0.859,4.281-1.276,8.28-1.276l5.708,0.853c3.807,0.763,8.516,3.042,14.133,6.851
                    c5.614,3.806,10.229,8.754,13.846,14.842c4.38,7.806,9.657,13.754,15.846,17.847c6.184,4.093,12.419,6.136,18.699,6.136
                    c6.28,0,11.704-0.476,16.274-1.423c4.565-0.952,8.848-2.383,12.847-4.285c1.713-12.758,6.377-22.559,13.988-29.41
                    c-10.848-1.14-20.601-2.857-29.264-5.14c-8.658-2.286-17.605-5.996-26.835-11.14c-9.235-5.137-16.896-11.516-22.985-19.126
                    c-6.09-7.614-11.088-17.61-14.987-29.979c-3.901-12.374-5.852-26.648-5.852-42.826c0-23.035,7.52-42.637,22.557-58.817
                    c-7.044-17.318-6.379-36.732,1.997-58.24c5.52-1.715,13.706-0.428,24.554,3.853c10.85,4.283,18.794,7.952,23.84,10.994
                    c5.046,3.041,9.089,5.618,12.135,7.708c17.705-4.947,35.976-7.421,54.818-7.421s37.117,2.474,54.823,7.421l10.849-6.849
                    c7.419-4.57,16.18-8.758,26.262-12.565c10.088-3.805,17.802-4.853,23.134-3.138c8.562,21.509,9.325,40.922,2.279,58.24
                    c15.036,16.18,22.559,35.787,22.559,58.817c0,16.178-1.958,30.497-5.853,42.966c-3.9,12.471-8.941,22.457-15.125,29.979
                    c-6.191,7.521-13.901,13.85-23.131,18.986c-9.232,5.14-18.182,8.85-26.84,11.136c-8.662,2.286-18.415,4.004-29.263,5.146
                    c9.894,8.562,14.842,22.077,14.842,40.539v60.237c0,3.422,1.19,6.279,3.572,8.562c2.379,2.279,6.136,2.95,11.276,1.995
                    c44.163-14.653,80.185-41.062,108.068-79.226c27.88-38.161,41.825-81.126,41.825-128.906
                    C438.536,184.851,428.728,148.168,409.132,114.573z"/>
                </g>
              </svg>
            </button>
          </div>
          <small class="o-small u-marginTopSmall">{{ repo.description }}</small>
          <div class="c-project--link">
            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                <path d="M0-.25h24v24H0z" fill="none"/>
            </svg>
          </div>
        </a>
    </ul>
  </div>
</template>

<script>
  import { getRepos } from '../../vuex/getters';

  export default {
    ready() {
      this.$set( 'repoElements', this.$el.querySelectorAll( '.c-project' ) );

      if ( this.selected ) {
        this.$el.querySelector( '#' + this.selected ).focus();
      }
    },

    data() {
      return {
        repoElements : null
      };
    },

    methods : {
      handleUp( target ) {
        let index = [].indexOf.call( this.repoElements, target );

        if ( index === -1 ) {
          index = this.repoElements.length;
        }

        if ( index > 0 ) {
          this.repoElements[ index - 1 ].focus();
        }
      },

      handleRight( target ) {
        target.click();
      },

      handleDown( target ) {
        let index = [].indexOf.call( this.repoElements, target );

        if ( index < this.repoElements.length -1  ) {
          this.repoElements[ index + 1 ].focus();
        }
      }
    },

    props : [ 'selected' ],

    vuex : {
      getters : {
        repos : getRepos
      }
    }
  };
</script>
