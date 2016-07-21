export default {
  commands : [
    {
      name    : 'install',
      command : 'npm install',
      flags   : [],
      docs    : 'https://docs.npmjs.com/cli/install'
    },
    {
      name    : 'drop & install',
      command : 'rm -rf ./node_modules && npm install',
      flags   : [],
      docs    : 'https://docs.npmjs.com/cli/install'
    },
    {
      name    : 'list',
      command : 'npm ls',
      flags   : [],
      docs    : 'https://docs.npmjs.com/cli/ls'
    }
  ],

  settings : [
    {
      label : 'Stay on top',
      desc  : 'Should Forrest stay on top of other windows',
      name  : 'alwaysOnTop',
      type  : 'checkbox'
    },
    {
      label : 'Display notifications',
      desc  : 'Display notifications when a script exits',
      name  : 'displayNotifications',
      type  : 'checkbox'
    },
    {
      label : 'Terminal output font size in px',
      desc  : 'Increase or decrease the font size of the terminal output',
      name  : 'terminalFontSize',
      type  : 'number'
    }
  ]
};
