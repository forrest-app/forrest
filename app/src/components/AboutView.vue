<style lang="scss">
  .c-about {
    position : relative;

    padding : 1em;

    text-align : center;

    &--dragHandle {
      position : absolute;

      top   : 0;
      right : 0;
      left  : 0;

      height : 2em;

      -webkit-user-select : none;
      -webkit-app-region  : drag;
    }

    &--heartList {
      padding    : 0 1em;
      list-style : none;

      &--item {
        margin-bottom : .5em;
      }
    }

    &--logo {
      display : inline-block;

      width  : 5em;
      height : 5em;

      margin-bottom : .5em;

      svg {
        max-width  : 100%;
        max-height : 100%;
      }
    }
  }
</style>

<template>
  <div class="c-about">
    <div class="c-about--dragHandle"></div>

    <div class="c-about--logo" transition="project">
      <svg width="330" height="330" viewBox="0 0 330 330" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>Forrest logo</title>
        <defs>
          <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="c">
            <stop stop-color="#EEEBEB" offset="0%" />
            <stop stop-color="#FCFBFB" offset="18.142%" />
            <stop stop-color="#CFCFCF" offset="100%" />
          </linearGradient>
          <ellipse id="b" cx="161.175" cy="161.175" rx="161.175" ry="161.175" />
          <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="a">
            <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
            <feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" in="shadowBlurOuter1" />
          </filter>
          <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="d">
            <stop stop-color="#344352" offset="0%" />
            <stop stop-color="#2A333C" offset="100%" />
          </linearGradient>
          <ellipse id="e" cx="161.175" cy="161.175" rx="150.059" ry="150.059" />
          <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="f">
            <feGaussianBlur stdDeviation="1.5" in="SourceAlpha" result="shadowBlurInner1" />
            <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1" />
            <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"
            />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" in="shadowInnerInner1" />
          </filter>
        </defs>
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(4 3)">
            <use fill="#000" filter="url(#a)" xlink:href="#b" />
            <use fill="url(#c)" xlink:href="#b" />
          </g>
          <g transform="translate(4 3)">
            <use fill="url(#d)" xlink:href="#e" />
            <use fill="#000" filter="url(#f)" xlink:href="#e" />
          </g>
          <g stroke-width="5">
            <path d="M102.013 105.372l49.846 103.795H52.167l49.846-103.795zM87.06 209.167h29.908v10.38H87.059v-10.38zM215.235 209.167h29.908v10.38h-29.908v-10.38zm14.954-103.795l49.846 103.795h-99.692l49.846-103.795z"
              stroke="#F1F1F1" />
            <path d="M194.584 240.954h49.847L166.1 69.693l-78.33 171.261h49.847v14.843h56.966v-14.843z" stroke="#2A333C" fill="#CD3632"
            />
          </g>
        </g>
      </svg>
    </div>
    <div class="u-marginBottom">
      <h1 class="o-headline-2">Forrest {{ version }}</h1>
      <p class="o-paragraph u-marginTopSmall">Brought to you by <button class="o-linkBtn" type="button" v-open-external="'https://twitter.com/stefanjudis'">Stefan Judis</button></p>

      <p class="o-paragraph">Check out the project on <button class="o-linkBtn" type="button" v-open-external="'https://github.com/stefanjudis/forrest'">GitHub</button>.</p>
    </div>

    <h2 class="o-headline-3 u-marginBottomSmall">Shout out to these projects/people:</h2>

    <ul class="c-about--heartList">
      <li class="c-about--heartList--item">
        <h3 class="o-headline-4 u-flexCenter">
          <span>Evan You</span>
          <button class="o-icon" type="button" v-open-external="'https://twitter.com/youyuxi'">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <path d="M72.955 17.969l-22.41 22.41c5.637 11.592 3.65 25.958-5.978 35.585-9.45 9.451-23.469 11.543-34.946 6.285 17.658 17.15 45.87 17.003 63.333-.461 17.625-17.623 17.625-46.196.001-63.819z"/>
              <path d="M58.281 47.966c-12.855 3.768-26.293-3.047-31.006-15.339-7.596 6.311-11.149 16.751-8.194 26.831 3.966 13.531 18.151 21.284 31.682 17.317 13.53-3.967 21.284-18.15 17.317-31.682a25.574 25.574 0 0 0-.675-1.979 25.458 25.458 0 0 1-9.124 4.852z"/>
              <circle cx="59.292" cy="32.235" r="19.743"/>
              <path d="M63.206 17.134L85.582 6.98 69.975 26.159"/>
              <path d="M67.625 21.553L90 11.399l-15.606 19.18"/>
            </svg>
          </button>
        </h3>
        <p>for creation and maintenance of <button class="o-linkBtn" type="button" v-open-external="'https://vuejs.org/'">vue.js</button></p>
      <li class="c-about--heartList--item">
        <h3 class="o-headline-4 u-flexCenter">
          <span>Greg Holguin</span>
          <button class="o-icon" type="button" v-open-external="'https://twitter.com/simulatedgreg'">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <path d="M72.955 17.969l-22.41 22.41c5.637 11.592 3.65 25.958-5.978 35.585-9.45 9.451-23.469 11.543-34.946 6.285 17.658 17.15 45.87 17.003 63.333-.461 17.625-17.623 17.625-46.196.001-63.819z"/>
              <path d="M58.281 47.966c-12.855 3.768-26.293-3.047-31.006-15.339-7.596 6.311-11.149 16.751-8.194 26.831 3.966 13.531 18.151 21.284 31.682 17.317 13.53-3.967 21.284-18.15 17.317-31.682a25.574 25.574 0 0 0-.675-1.979 25.458 25.458 0 0 1-9.124 4.852z"/>
              <circle cx="59.292" cy="32.235" r="19.743"/>
              <path d="M63.206 17.134L85.582 6.98 69.975 26.159"/>
              <path d="M67.625 21.553L90 11.399l-15.606 19.18"/>
            </svg>
          </button>
        </h3>
        <p>for creation of the <button class="o-linkBtn" type="button" v-open-external="'https://github.com/SimulatedGREG/electron-vue'">electron vue boilerplate</button></p>
      <li class="c-about--heartList--item">
        <h3 class="o-headline-4 u-flexCenter">
          <span>Sindre Sorhus</span>
          <button class="o-icon" type="button" v-open-external="'https://twitter.com/sindresorhus'">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <path d="M72.955 17.969l-22.41 22.41c5.637 11.592 3.65 25.958-5.978 35.585-9.45 9.451-23.469 11.543-34.946 6.285 17.658 17.15 45.87 17.003 63.333-.461 17.625-17.623 17.625-46.196.001-63.819z"/>
              <path d="M58.281 47.966c-12.855 3.768-26.293-3.047-31.006-15.339-7.596 6.311-11.149 16.751-8.194 26.831 3.966 13.531 18.151 21.284 31.682 17.317 13.53-3.967 21.284-18.15 17.317-31.682a25.574 25.574 0 0 0-.675-1.979 25.458 25.458 0 0 1-9.124 4.852z"/>
              <circle cx="59.292" cy="32.235" r="19.743"/>
              <path d="M63.206 17.134L85.582 6.98 69.975 26.159"/>
              <path d="M67.625 21.553L90 11.399l-15.606 19.18"/>
            </svg>
          </button>
        </h3>
        <p>for all this great work and especially for solving the issues around environments and the holy PATH.
      <li class="c-about--heartList--item">
        <h3 class="o-headline-4 u-flexCenter">
          <span>Michael Kühnel</span>
          <button class="o-icon" type="button" v-open-external="'https://twitter.com/mkuehnel'">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <path d="M72.955 17.969l-22.41 22.41c5.637 11.592 3.65 25.958-5.978 35.585-9.45 9.451-23.469 11.543-34.946 6.285 17.658 17.15 45.87 17.003 63.333-.461 17.625-17.623 17.625-46.196.001-63.819z"/>
              <path d="M58.281 47.966c-12.855 3.768-26.293-3.047-31.006-15.339-7.596 6.311-11.149 16.751-8.194 26.831 3.966 13.531 18.151 21.284 31.682 17.317 13.53-3.967 21.284-18.15 17.317-31.682a25.574 25.574 0 0 0-.675-1.979 25.458 25.458 0 0 1-9.124 4.852z"/>
              <circle cx="59.292" cy="32.235" r="19.743"/>
              <path d="M63.206 17.134L85.582 6.98 69.975 26.159"/>
              <path d="M67.625 21.553L90 11.399l-15.606 19.18"/>
            </svg>
          </button>
        </h3>
        <p>for giving Forrest its name</p>
      <li class="c-about--heartList--item">
        <h3 class="o-headline-4">Calvin Goodman</h3>
        <p>for creation of the "Home" icon from the Noun Project
      <li class="c-about--heartList--item">
        <h3 class="o-headline-4">Michal Beno</h3>
        <p>for creation of the "Settings" icon from the Noun Project
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        version : this.$electron.remote.require( 'electron' ).app.getVersion()
      };
    }
  };
</script>
