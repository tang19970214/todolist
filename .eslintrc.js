module.exports = {
  root: true,

  parser: 'babel-eslint',

  parserOptions: {
    sourceType: 'module'
  },

  env: {
    browser: true,
  },

  plugins: [],

  'rules': {
    'no-debugger': (process.env.NODE_ENV === 'production') ? 2 : 0,
    
    'arrow-parens': 0,
    
    'generator-star-spacing': 0,
  }
};