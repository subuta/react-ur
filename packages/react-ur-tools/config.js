const path = require('path')
const findUp = require('find-up')

const ROUTES_PATH = './routes'

const ROOT_DIR = path.dirname(findUp.sync('package.json'))
const SRC_DIR = path.resolve(ROOT_DIR, './src')
const DIST_DIR = path.resolve(ROOT_DIR, './dist')
const SERVER_DIR = path.resolve(SRC_DIR, './server')
const DIST_SERVER_DIR = path.resolve(DIST_DIR, './server')
const ROUTES_DIR = path.resolve(SRC_DIR, ROUTES_PATH)
const DIST_ROUTES_DIR = path.resolve(DIST_DIR, ROUTES_PATH)
const CLIENT_DIR = path.resolve(SRC_DIR, './client')
const PUBLIC_DIR = path.resolve(ROOT_DIR, './public')
const ROOT_NODE_MODULES_DIR = path.resolve(ROOT_DIR, './node_modules')

const LIB_ROOT_DIR = __dirname
const LIB_NODE_MODULES_DIR = path.resolve(LIB_ROOT_DIR, './node_modules')

const APP_PORT = parseInt(process.env.PORT, 10) || 3000
const WEBPACK_DEV_SERVER_PORT = parseInt(process.env.WEBPACK_DEV_SERVER_PORT, 10) || 8080

const ROUTES_JSON_PATH = path.resolve(ROOT_DIR, 'routes.json')

module.exports = {
  ROOT_DIR,
  SRC_DIR,
  DIST_DIR,
  SERVER_DIR,
  DIST_SERVER_DIR,
  ROUTES_PATH,
  ROUTES_DIR,
  DIST_ROUTES_DIR,
  CLIENT_DIR,
  PUBLIC_DIR,
  APP_PORT,
  WEBPACK_DEV_SERVER_PORT,
  LIB_ROOT_DIR,
  ROOT_NODE_MODULES_DIR,
  LIB_NODE_MODULES_DIR,
  ROUTES_JSON_PATH
}
