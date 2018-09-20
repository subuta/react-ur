'use strict' // load env

const path = require('path')

if (process.env.NODE_ENV !== 'production') {
  require = require('esm')(module)
}

require('module-alias/register')

if (process.env.NODE_ENV !== 'production') {
  // Add dynamic alias to /src/pages while development.
  const moduleAlias = require('module-alias')
  moduleAlias.addAlias('@app/pages', path.resolve(process.cwd(), './src/pages'))

  require('@babel/register')
}

require('./main')
