const path = require('path')
const findUp = require('find-up')

const PAGES_PATH = './pages'

const ROOT_DIR = path.dirname(findUp.sync('package.json'))
const SRC_DIR = path.resolve(ROOT_DIR, './src')
const DIST_DIR = path.resolve(ROOT_DIR, './dist')
const SERVER_DIR = path.resolve(SRC_DIR, './server')
const DIST_SERVER_DIR = path.resolve(DIST_DIR, './server')
const PAGES_DIR = path.resolve(SRC_DIR, PAGES_PATH)
const DIST_PAGES_DIR = path.resolve(DIST_DIR, PAGES_PATH)
const CLIENT_DIR = path.resolve(SRC_DIR, './client')
const PUBLIC_DIR = path.resolve(ROOT_DIR, './public')
const ROOT_NODE_MODULES_DIR = path.resolve(ROOT_DIR, './node_modules')

const LIB_ROOT_DIR = __dirname
const LIB_NODE_MODULES_DIR = path.resolve(LIB_ROOT_DIR, './node_modules')

const APP_PORT = parseInt(process.env.PORT, 10) || 3000
const WEBPACK_DEV_SERVER_PORT = parseInt(process.env.WEBPACK_DEV_SERVER_PORT, 10) || 8080

const PAGES_JSON_PATH = path.resolve(ROOT_DIR, 'pages.json')

module.exports = {
  ROOT_DIR,
  SRC_DIR,
  DIST_DIR,
  SERVER_DIR,
  DIST_SERVER_DIR,
  PAGES_PATH,
  PAGES_DIR,
  DIST_PAGES_DIR,
  CLIENT_DIR,
  PUBLIC_DIR,
  APP_PORT,
  WEBPACK_DEV_SERVER_PORT,
  LIB_ROOT_DIR,
  ROOT_NODE_MODULES_DIR,
  LIB_NODE_MODULES_DIR,
  PAGES_JSON_PATH
}
