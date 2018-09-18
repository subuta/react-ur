'use strict' // load env

if (process.env.NODE_ENV !== 'production') {
  require('esm')
  require('@babel/register')
}

require('./main')
