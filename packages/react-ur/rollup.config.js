import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import external from 'rollup-plugin-peer-deps-external'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      name: 'reactUr',
      format: 'umd',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-helmet': 'reactHelmet',
        'react-router-dom': 'reactRouterDom',
        'react-hot-loader': 'reactHotLoader',
      }
    }
  ],
  plugins: [
    external(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs({
      namedExports: {
        'react-hot-loader': [
          'hot'
        ]
      }
    })
  ]
}