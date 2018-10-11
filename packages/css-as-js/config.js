const path = require('path')
const findUp = require('find-up')

const ROOT_DIR = path.dirname(findUp.sync('package.json'))
const STYLES_PATH = path.resolve(ROOT_DIR, './styles.css')

module.exports = {
  ROOT_DIR,
  STYLES_PATH
}
