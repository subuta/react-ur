import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import external from 'rollup-plugin-peer-deps-external'

export default {
  input: 'src/index.js',
  external: [
    'fs',
    '@app/src/pages'
  ],
  output: [
    {
      file: 'dist/index.js',
      name: 'reactUr',
      format: 'umd',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-dom/server': 'ReactDOMServer',
        'react-helmet': 'reactHelmet',
        'react-router-dom': 'reactRouterDom',
        'react-hot-loader': 'reactHotLoader',
        'recompose': 'recompose',
        'react-loadable': 'Loadable',
        'react-loadable/webpack': 'LoadableWebpack',
        'fs': 'fs',
        '@app/src/pages': 'Pages'
      }
    }
  ],
  plugins: [
    external(),
    babel(),
    resolve(),
    commonjs({
      namedExports: {
        'react-hot-loader': [
          'hot'
        ],
        'react-dom/server': [
          'renderToString',
          'renderToStaticMarkup'
        ]
      }
    })
  ]
}