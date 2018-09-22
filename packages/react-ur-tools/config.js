const path = require('path')

const ROOT_DIR = process.cwd()
const SRC_DIR = path.resolve(ROOT_DIR, './src')
const CLIENT_DIR = path.resolve(SRC_DIR, './client')
const PUBLIC_DIR = path.resolve(ROOT_DIR, './public')
const ROOT_NODE_MODULES_DIR = path.resolve(ROOT_DIR, './node_modules')

const LIB_ROOT_DIR = __dirname
const LIB_NODE_MODULES_DIR = path.resolve(LIB_ROOT_DIR, './node_modules')

const APP_PORT = parseInt(process.env.PORT, 10) || 3000
const WEBPACK_DEV_SERVER_PORT = parseInt(process.env.WEBPACK_DEV_SERVER_PORT, 10) || 8080

module.exports = {
  ROOT_DIR,
  CLIENT_DIR,
  PUBLIC_DIR,
  APP_PORT,
  WEBPACK_DEV_SERVER_PORT,
  LIB_ROOT_DIR,
  ROOT_NODE_MODULES_DIR,
  LIB_NODE_MODULES_DIR
}