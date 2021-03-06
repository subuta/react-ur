import _ from 'lodash'

import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'

import pkg from './package.json'

const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {}),
  'loadable-components/server',
  'fs',
  'path',
  'stream',
  '@app/src/routes',
  '@app/routes.json'
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

let globals = _.transform(pkg.peerDependencies, (result, value, key) => {
  result[key] = _.upperFirst(_.camelCase(key))
}, {})

globals = {
  ...globals,
  'lodash': '_',
  'loadable-components/server': 'LoadableServer',
  'fs': 'fs',
  'stream': 'stream',
  'path': 'path',
  '@app/src/routes': 'Routes',
  '@app/routes.json': 'routesJson'
}

const getConfig = (input, output, name) => ({
  input: input,
  external,
  output: [
    {
      name,
      globals,
      file: output,
      format: 'umd'
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
  getConfig('src/index.js', 'dist/index.js', 'reactUr')
]
