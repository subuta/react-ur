// Require the webpack-chain module. This module exports a single
// constructor function for creating a configuration API.
const WebpackChainConfig = require('webpack-chain')

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const {
  ROOT_DIR,
  ROOT_NODE_MODULES_DIR,
  CLIENT_DIR,
  PUBLIC_DIR,

  LIB_NODE_MODULES_DIR,

  APP_PORT,
  WEBPACK_DEV_SERVER_PORT
} = require('../../config.js')

// Instantiate the configuration with a new API
const config = new WebpackChainConfig()

const isAnalyze = !!process.env.ANALYZE
const dev = process.env.NODE_ENV !== 'production'

const babelConfig = require('../../babel/browser')()

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
  .chunkFilename('[name].js')
  .filename('[name].bundle.js')

// Add modules dir
config.resolve.modules
  .add(ROOT_DIR)
  .add(ROOT_NODE_MODULES_DIR)
  .add(LIB_NODE_MODULES_DIR)

// Add alias for @
config.resolve.alias
  .set('@app', ROOT_DIR)

// Add babel-loader for JS.
config.module
  .rule('babel')
  .test(/\.jsx?$/)
  .exclude
  .add(/node_modules/)
  .end()
  .use('babel')
  // Use this packages own babel-loader.
  .loader(require.resolve('babel-loader'))
  .options({
    babelrc: false,
    ...babelConfig
  })

// CAUTION: These configuration will be ignored at webpack.js.
// SEE: https://github.com/webpack/docs/wiki/webpack-dev-server
config.devServer
  .hot(true)
  .noInfo(true)
  .contentBase(PUBLIC_DIR)
  .proxy({
    '/': `http://localhost:${APP_PORT}`
  })

// SEE: https://github.com/mzgoddard/hard-source-webpack-plugin/issues/416
// SEE: https://github.com/mzgoddard/hard-source-webpack-plugin/issues/443
// Enable better caching for webpack compilation.
config
  .plugin('hard-source')
  .use(HardSourceWebpackPlugin)

config
  .plugin('error-overlay')
  .use(ErrorOverlayPlugin)

// Show progress-bar while compile.
config
  .plugin('progress')
  .use(WebpackBar, [{
    name: 'client',
    // Is show profile(Time taken while compile at each loader)
    profile: true
  }])

// Clean directory before compile.
config
  .plugin('clean')
  .use(CleanWebpackPlugin, [['public/**/*.js'], {
    exclude: ['index.html'],
    beforeEmit: true
  }])

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
      .entry('main')
      .add(`webpack-dev-server/client?http://localhost:${WEBPACK_DEV_SERVER_PORT}/`)
      .add('webpack/hot/dev-server')

    devConfig
      .plugin('friendly-errors')
      .use(FriendlyErrorsWebpackPlugin, [{
        clearConsole: false
      }])

    devConfig
      .plugin('hot-module-replacement')
      .use(webpack.HotModuleReplacementPlugin)
  })

// Analyze-only setting
config
  .when(isAnalyze, analyzeConfig => {
    analyzeConfig
      .plugin('named-modules')
      .use(BundleAnalyzerPlugin)

    // Disable some plugins for analyze correctly.
    analyzeConfig.plugins.delete('hard-source')
    analyzeConfig.plugins.delete('progress')
  })

// For debug print.
// console.log(config.toString())

export {
  config
}

// Export the completed configuration object to be consumed by webpack
export default config.toConfig()

