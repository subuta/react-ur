'use strict' // load env

const path = require('path')

require = require('esm')(module)
require('module-alias/register')

if (process.env.NODE_ENV !== 'production') {
  const moduleAlias = require('module-alias')
  // Override alias to @app/src/pages while development.
  moduleAlias.addAlias('@app/src/pages', path.resolve(process.cwd(), './src/pages'))

  require('@babel/register')
}

require('./main')
