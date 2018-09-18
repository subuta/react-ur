import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  external: [
    'react'
  ],
  output: [
    {
      file: 'dist/index.js',
      name: 'reactUr',
      format: 'umd',
      globals: {
        'react': 'React'
      }
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs()
  ]
}