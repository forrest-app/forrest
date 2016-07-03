export default {
  commands : [
    {
      name    : 'install',
      command : 'npm install',
      flags   : [ '--save', '--save-dev' ]
    }
  ],

  settings : [
    {
      label : 'Path to node',
      desc  : 'In case you use something like NVM please define where your node version is located',
      name  : 'path',
      type  : 'text'
    },
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
    }
  ]
};
