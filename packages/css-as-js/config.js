const path = require('path')
const findUp = require('find-up')

const ROOT_DIR = path.dirname(findUp.sync('package.json'))
const DEFAULT_STYLES_PATH = path.resolve(ROOT_DIR, './styles.css')
const DEFAULT_TAILWINDJS_PATH = path.resolve(ROOT_DIR, './tailwind.js')

const STYLES_JSON_PATH = path.resolve(ROOT_DIR, './tmp/styles.json')

module.exports = {
  ROOT_DIR,
  DEFAULT_STYLES_PATH,
  DEFAULT_TAILWINDJS_PATH,
  STYLES_JSON_PATH
}
