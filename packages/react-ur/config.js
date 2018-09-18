const path = require('path')
const ROOT_DIR = process.cwd()
const SRC_DIR = path.resolve(ROOT_DIR, './src')
const CLIENT_DIR = path.resolve(SRC_DIR, './client')
const PUBLIC_DIR = path.resolve(ROOT_DIR, './public')
const DIST_DIR = path.resolve(ROOT_DIR, './dist')

const LODABLE_JSON_PATH = path.resolve(DIST_DIR, 'react-loadable.json')

module.exports = {
  ROOT_DIR,
  CLIENT_DIR,
  PUBLIC_DIR,
  LODABLE_JSON_PATH
}
