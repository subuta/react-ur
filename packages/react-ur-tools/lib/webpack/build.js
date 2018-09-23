import webpack from 'webpack'
import config from './config'

// Create webpack configuration from webpack-chain instance.
const compiler = webpack(config)

console.log(`[start] webpack build env=${process.env.NODE_ENV}`)
compiler.run((err, stats) => {
  console.log(`[end] webpack build env=${process.env.NODE_ENV}`)
  if (err) {
    console.error('err = ', err)
    console.log('stats = ', stats)
    process.exit(1)
  }
});