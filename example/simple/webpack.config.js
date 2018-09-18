// Require the webpack-chain module. This module exports a single
// constructor function for creating a configuration API.
const Config = require('webpack-chain')

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

const {
  ROOT_DIR,
  CLIENT_DIR,
  PUBLIC_DIR
} = require('./config.js')

// Instantiate the configuration with a new API
const config = new Config()

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000

// Interact with entry points
config
  .entry('main')
  .add(path.resolve(CLIENT_DIR, './index.js'))
  .end()
  .stats(false)
  .target('web')
  .mode(dev ? 'development' : 'production')
  .devtool(dev ? 'cheap-module-source-map' : false)
  // Modify output settings
  .output
  .path(PUBLIC_DIR)
  .publicPath('/')
  .filename('[name].bundle.js')

// Add modules dir
config.resolve.modules
  .add('node_modules')
  .add(ROOT_DIR)

// Load and use `.babelrc.web`
const babelrc = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, '.babelrc.web')))

// Add babel-loader for JS.
config.module
  .rule('babel')
  .test(/\.jsx?$/)
  .exclude
  .add(/node_modules/)
  .end()
  .use('babel')
  .loader('babel-loader')
  .options({
    babelrc: false,
    ...babelrc
  })

config.devServer
  .hot(true)
  .open(true)
  // .noInfo(true)
  .contentBase(PUBLIC_DIR)

// Set webpack optimization option.
config.optimization
  .noEmitOnErrors(true)

// Mock nodejs-only modules
config.node
  .set('fs', 'empty')
  .set('path', 'empty')

// Dev-only setting
config
  .when(dev, devConfig => {
    devConfig
      .plugin('hot-module-replacement')
      .use(webpack.HotModuleReplacementPlugin)
  })

// For debug print.
// console.log(config.toString())

// Export the completed configuration object to be consumed by webpack
module.exports = config.toConfig()
