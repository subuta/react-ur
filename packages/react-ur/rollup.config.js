import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'

import pkg from './package.json'

const external = [
  ...Object.keys(pkg.peerDependencies),
  ...Object.keys(pkg.dependencies),
  'loadable-components/server',
  'fs',
  'path',
  'stream',
  '@app/src/pages',
  '@app/pages.json'
]

// For suppress warning of rollup :(
const namedExports = {
  'react-hot-loader': [
    'hot'
  ],
  'react-dom/server': [
    'renderToString',
    'renderToStaticMarkup'
  ]
}

const getConfig = (input, output) => ({
  input: input,
  external,
  output: [
    {
      file: output,
      format: 'cjs',
      exports: 'named'
    }
  ],
  plugins: [
    json(),
    babel(),
    resolve(),
    commonjs({ namedExports })
  ]
})

export default [
  getConfig('src/index.js', 'dist/index.js')
]