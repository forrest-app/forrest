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
      name : 'path',
      type : 'text'
    },
    {
      name : 'alwaysOnTop',
      type : 'checkbox'
    }
  ]
};
