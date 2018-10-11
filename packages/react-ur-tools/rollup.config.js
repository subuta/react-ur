import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'

import pkg from './package.json'

const plugins = [
  json(),
  babel(),
  resolve(),
  commonjs()
]

const getConfig = (input, output) => ({
  input,
  output: [
    {
      file: output,
      format: 'cjs',
      exports: 'named'
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    'path',
    'fs'
  ],
  plugins
})

export default [
  getConfig('src/index.js', 'lib/index.js'),
  getConfig('src/webpack/devServer.js', 'lib/webpack/devServer.bundle.js'),
  getConfig('src/webpack/config.js', 'lib/webpack/config.bundle.js'),
  getConfig('src/webpack/build.js', 'lib/webpack/build.bundle.js')
]
