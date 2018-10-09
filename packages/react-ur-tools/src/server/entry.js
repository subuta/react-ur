'use strict' // load env

const {
  ROOT_DIR,
  ROUTES_DIR,
  SERVER_DIR,
  DIST_SERVER_DIR,
  DIST_ROUTES_DIR
} = require('../../config')

require = require('esm')(module)
require('module-alias/register')

require('dotenv').config()

const dev = process.env.NODE_ENV !== 'production'

const moduleAlias = require('module-alias')

// Add custom alias to module-alias.
moduleAlias.addAlias('@app', ROOT_DIR)
moduleAlias.addAlias('@app/src/routes', dev ? ROUTES_DIR : DIST_ROUTES_DIR)

// Add custom directories.
moduleAlias.addPath(ROOT_DIR)

if (dev) {
  require('@babel/register')
}

require(dev ? SERVER_DIR : DIST_SERVER_DIR)
