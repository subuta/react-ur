// Require the webpack-chain module. This module exports a single
// constructor function for creating a configuration API.
const config = require('react-ur/webpack.config.js')

// For debug print.
// console.log(config.toString())

// Export the completed configuration object to be consumed by webpack
module.exports = config.toConfig()
