module.exports = {
    'env': {
      'browser': true,
      'commonjs': true,
      'es2022': true,
    },
    'extends': [
      'google',
    ],
    'parserOptions': {
      'ecmaVersion': 13,
    },
    'rules': {
      'linebreak-style': 0,
      'object-curly-spacing': 0,
      'require-jsdoc': 0,
      'max-len': ['error', { 'code': 200 }],
      'padded-blocks': 0,
      'no-undef-init': 'error',
    },
  };