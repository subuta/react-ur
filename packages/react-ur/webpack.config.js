// Require the webpack-chain module. This module exports a single
// constructor function for creating a configuration API.
const Config = require('webpack-chain')

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
  CLIENT_DIR,
  PUBLIC_DIR
} = require('./config.js')

// Instantiate the configuration with a new API
const config = new Config()

const isAnalyze = !!process.env.ANALYZE
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
    presets: [
      ['@babel/env', {
        'targets': [
          'last 1 version',
          '> 1%'
        ],
        'useBuiltIns': 'entry',
        'modules': false
      }]
    ]
  })

config.devServer
  .hot(true)
  .noInfo(true)
  .contentBase(PUBLIC_DIR)
  .proxy({
    '/': `http://localhost:${port}`
  })

// SEE: https://github.com/mzgoddard/hard-source-webpack-plugin/issues/416
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

// Dev-only setting
config
  .when(dev, devConfig => {
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

// Export the completed configuration object to be consumed by webpack
module.exports = config
