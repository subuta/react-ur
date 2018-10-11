import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'

import _ from 'lodash'
import pkg from './package.json'

const plugins = [
  json(),
  babel(),
  resolve(),
  commonjs()
]

const deps = {
  ...(pkg.dependencies || {}),
  ...(pkg.devDependencies || {})
}

const external = [
  ..._.keys(deps),
  'path',
  'fs',
  '@app/styles.json'
]

let globals = _.transform(deps, (result, value, key) => {
  result[key] = _.upperFirst(_.camelCase(key))
}, {})

globals = {
  ...globals,
  'lodash': '_',
  'path': 'path',
  'fs': 'fs',
  '@app/styles.json': 'stylesJson'
}

const getConfig = (input, output, name) => ({
  input,
  output: [
    {
      name,
      globals,
      file: output,
      format: 'umd'
    }
  ],
  external,
  plugins
})

export default [
  getConfig('src/cssAsJson.js', 'lib/cssAsJson.js', 'cssAsJson'),
  getConfig('src/index.js', 'lib/index.js', 'cssAsJs')
]
