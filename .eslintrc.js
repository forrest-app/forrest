module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true
  },
  plugins: [
    'html'
  ],
  'extends': 'eslint:recommended',
  'parserOptions': {
    'sourceType': 'module'
  },
  'rules': {
    'array-bracket-spacing' : [
      'error',
      'always'
    ],
    'key-spacing' : [
      2,
      {
        'singleLine' : {
            'beforeColon' : true,
            'afterColon'  : true
        },
        'multiLine': {
            'beforeColon' : true,
            'afterColon'  : true,
            'align'       : 'colon'
        }
      }
    ],
    'space-in-parens': [
      'error',
      'always'
    ],
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console' : process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
