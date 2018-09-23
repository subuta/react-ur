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
    'path',
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies)
  ],
  plugins
})

export default [
  getConfig('lib/webpack/devServer.js', 'dist/webpack/devServer.js'),
  getConfig('lib/webpack/config.js', 'dist/webpack/config.js'),
  getConfig('lib/webpack/build.js', 'dist/webpack/build.js'),
]