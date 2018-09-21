// Babel configuration for browser(will be used by @babel/register || @babel/cli).
module.exports = function (context = {}) {
  return {
    'presets': [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          'targets': {
            'node': 'current'
          }
        }
      ]
    ],
    'plugins': [
      'react-loadable/babel',
      'babel-plugin-dynamic-import-node',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-object-rest-spread'
    ]
  }
}