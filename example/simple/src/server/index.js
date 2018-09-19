'use strict' // load env

if (process.env.NODE_ENV !== 'production') {
  require = require('esm')(module)
  require('module-alias/register')
  require('@babel/register')
}

require('./main')
