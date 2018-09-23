const resolve = require.resolve

// Babel configuration for browser(will be used by @babel/register || @babel/cli).
module.exports = function (context = {}) {
  return {
    'presets': [
      resolve('@babel/preset-react'),
      [
        resolve('@babel/preset-env'),
        {
          'targets': {
            'node': 'current'
          }
        }
      ]
    ],
    'plugins': [
      resolve('loadable-components/babel'),
      resolve('@babel/plugin-syntax-dynamic-import'),
      resolve('@babel/plugin-proposal-object-rest-spread')
    ]
  }
}