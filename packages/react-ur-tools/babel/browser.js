const resolve = require.resolve

// Babel configuration for browser(will be used by webpack).
module.exports = function (context = {}) {
  return {
    'presets': [
      resolve('@babel/preset-react'),
      [
        resolve('@babel/preset-env'),
        {
          'targets': [
            'last 1 version',
            '> 2%'
          ],
          'useBuiltIns': 'entry',
          'modules': false
        }
      ]
    ],
    'plugins': [
      resolve('react-hot-loader/babel'),
      resolve('loadable-components/babel'),
      resolve('@babel/plugin-syntax-dynamic-import'),
      resolve('@babel/plugin-proposal-object-rest-spread')
    ]
  }
}