<style lang="scss">
  .c-help {
    position : relative;

    padding : 1em;

    text-align : center;

    &--definitionList {
      dt {
        clear   : both;
        width   : 25%;
        padding : .5em 0;
      }

      dd {
        font-size  : .9em;
        
        width      : 75%;
        text-align : left;

        padding : .5em 0 .5em .5em;
      }

      dt, dd {
        float   : left;
        margin  : 0;
      }
    }

    &--key {
      display :  inline-block;

      font-size   : 1em;
      font-weight : bold;
      color       : var(--header-background);
      text-align  : center;

      min-height  : 2em;
    }
  }
</style>

<template>
  <div class="c-help">
    <div class="c-dragHandle"></div>

    <div class="c-logo" transition="project">
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
      <h1 class="o-headline-2">Shortcuts</h1>
    </div>

    <div class="u-flexCenter u-marginBottom">
      <div>
        <h4 class="o-headline-4">Home</h4>

        <dl class="c-help--definitionList u-marginTopSmall">
          <dt aria-label="Right mouse button">
            <svg class="u-fillWhite" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M13 1.07V9h7c0-4.08-3.05-7.44-7-7.93zM4 15c0 4.42 3.58 8 8 8s8-3.58 8-8v-4H4v4zm7-13.93C7.05 1.56 4 4.92 4 9h7V1.07z" stroke="#2a333c" />
              <path d="M13 1.07V9h7c0-4.08-3.05-7.44-7-7.93z" fill="#cb3837" />
            </svg>
          </dt>
          <dd>Show more project options</dd>

          <dt aria-label="Right arrow key">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </dt>
          <dd>Open project</dd>

          <dt aria-label="Up and down keys">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" fill="#010101" />
            </svg>
          </dt>
          <dd>Navigate through projects</dd>
        </dl>
      </div>
      <div>
        <h4 class="o-headline-4">Projects</h4>

        <dl class="c-help--definitionList u-marginTopSmall">
          <dt aria-label="Escape key">
            <span class="c-help--key u-textTransformUppercase">esc</span>
          </dt>
          <dd>Terminate running command</dd>

          <dt aria-label="Left arrow key">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </dt>
          <dd>Go Home / Terminate running command</dd>

          <dt aria-label="Up and down keys">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" fill="#010101" />
            </svg>
          </dt>
          <dd>Navigate through commands</dd>
        </dl>
      </div>
    </div>

    <p class="u-marginTop">
      To reach other actions use the <span class="c-help--key u-textTransformUppercase">tab</span> key when needed.
    </p>
  </div>
</template>
