export default {
  commands : [
    {
      name    : 'install',
      slug    : 'default-install',
      command : 'npm install',
      flags   : [],
      docs    : 'https://docs.npmjs.com/cli/install'
    },
    {
      name    : 'drop & install',
      slug    : 'default-drop-&-install',
      command : 'rm -rf ./node_modules && npm install',
      flags   : [],
      docs    : 'https://docs.npmjs.com/cli/install'
    },
    {
      name    : 'shrinkwrap',
      slug    : 'default-shrinkwrap',
      command : 'npm shrinkwrap',
      flags   : [],
      docs    : 'https://docs.npmjs.com/cli/shrinkwrap'
    },
    {
      name    : 'list',
      slug    : 'default-list',
      command : 'npm ls',
      flags   : [],
      docs    : 'https://docs.npmjs.com/cli/ls'
    },
    {
      name    : 'prune',
      slug    : 'default-prune',
      command : 'npm prune',
      flags   : [],
      docs    : 'https://docs.npmjs.com/cli/prune'
    },
    {
      name    : 'outdated',
      slug    : 'default-outdated',
      command : 'npm outdated',
      flags   : [],
      docs    : 'https://docs.npmjs.com/cli/outdated'
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
      label : 'Show project path',
      desc  : 'Display project path in list view',
      name  : 'showProjectPath',
      type  : 'checkbox'
    },
    {
      label : 'Terminal output font size',
      desc  : 'Increase/decrease the font size of the terminal output',
      name  : 'terminalFontSize',
      type  : 'number',
      unit  : 'px'
    }
  ]
};
