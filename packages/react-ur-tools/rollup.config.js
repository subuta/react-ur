import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

const plugins = [
  babel(),
  resolve(),
  commonjs()
]

const getConfig = (input, output) => ({
  input,
  output: [
    {
      file: output,
      format: 'cjs'
    }
  ],
  plugins
})

export default [
  getConfig('lib/webpack/devServer.js', 'dist/webpack/devServer.js')
]