// Babel configuration for browser(will be used by webpack).
module.exports = function (context = {}) {
  return {
    'presets': [
      '@babel/preset-react',
      [
        '@babel/preset-env',
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
      'react-hot-loader/babel',
      'react-loadable/babel',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-object-rest-spread'
    ]
  }
}