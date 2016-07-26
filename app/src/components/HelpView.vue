<style lang="scss">
  .c-help {
    position : relative;

    padding : 1em;

    text-align : center;

    &--definitionList {
      font-size : .9em;

      dt {
        clear   : both;
        width   : 20%;
        padding : .5em 0;
      }

      dd {
        width      : 80%;
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

      background-color : var(--header-background);
      border-radius    : 2px;

      color : var( --code-color );

      padding : .25em .5em;

      text-align : center;

      min-width  : 2em;
      min-height : 2em;
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
      <h1 class="o-headline-2">Keyboard Shortcuts</h1>
    </div>

    <dl class="c-help--definitionList">
      <dt aria-label="Left and right keys">
        <span class="c-help--key">&#8592;</span>
        <span class="c-help--key">&#8594;</span>
      </dt>
      <dd>Navigate between the home and project screens</dd>

      <dt aria-label="Up and down keys">
        <span class="c-help--key">&#8593;</span>
        <span class="c-help--key">&#8595;</span>
      </dt>
      <dd>Navigate between the available projects and commands</dd>

      <dt aria-label="Tab key">
        <span class="c-help--key">tab</span>
      </dt>
      <dd>Focus on the next action</dd>

      <dt aria-label="Shift plus tab key combination">
        <span class="c-help--key">shift + tab</span>
      </dt>
      <dd>Focus on the previous action</dd>

      <dt aria-label="Escape key">
        <span class="c-help--key">esc</span>
      </dt>
      <dd>Close a running command</dd>

      <dt aria-label="Right arrow key">
        <span class="c-help--key">&#8594;</span>
      </dt>
      <dd>Run a given command when in project panel</dd>

      <dt aria-label="Left arrow key">
        <span class="c-help--key">&#8592;</span>
      </dt>
      <dd>Terminate a running command</dd>

      <dt aria-label="Right mouse button">
        <span class="c-help--key">right mouse click</span>
      </dt>
      <dd>Display more options when click on project</dd>
    </dl>
  </div>
</template>
