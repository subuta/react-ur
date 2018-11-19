import _ from 'lodash'
import postcss from 'postcss'
import postcssJs from 'postcss-js'
import prettyBytes from 'pretty-bytes'
import debug from 'debug'
import mkdirp from 'mkdirp'

import fs from 'fs'
import path from 'path'

import {
  DEFAULT_STYLES_PATH,
  DEFAULT_TAILWINDJS_PATH,
  STYLES_JSON_PATH
} from '../config'

import postcssrc from 'postcss-load-config'

// Log to stdout.
let log = debug('css-as-js:log')
log.log = console.log.bind(console)

// Selectors should be ignored for css-in-js.
const IGNORED_SELECTOR = /(:hover|:active|:focus)/g

const transform = (root) => {
  // Ignore array and non-objects(scalar).
  if (_.isArray(root) || !_.isObject(root)) return root

  return _.transform(root, (result, value, key) => {
    if (key.match(IGNORED_SELECTOR)) return

    // Remove escape or line feed from key.
    key = key.replace ? key.replace(/\\/g, '').replace(/\n/g, ' ') : key

    value = transform(value)

    // Parse value as number if possible.
    if (_.endsWith(value, 'px')) {
      // if value is px.
      value = Number(value.replace(/px$/, ''))
    } else if (!_.isNaN(Number(value))) {
      value = Number(value)
    }

    result[key] = value
  }, {})
}

const PKG_TAILWIND = 'tailwindcss'

const detectPackage = (css) => {
  if (_.includes(css, '@tailwind preflight;')) {
    return PKG_TAILWIND
  }
  return ''
}

const onlyClassSelector = (value, key) => _.startsWith(key, '.')

const ensureExists = (path) => {
  if (!fs.existsSync(path)) {
    throw new Error(`File not found. must be placed at '${path}'`)
  }
}

module.exports = async (paths = {}) => {
  log('[start]')

  const stylesPath = paths.stylesPath || DEFAULT_STYLES_PATH
  const tailwindJsPath = paths.tailwindJsPath || DEFAULT_TAILWINDJS_PATH

  ensureExists(stylesPath)

  const rawCss = fs.readFileSync(stylesPath, 'utf8')

  const pkg = detectPackage(rawCss)

  log(`[progress] detect package done. pkg=${pkg}`)

  const { plugins, options } = await postcssrc()
  log(`[progress] used plugins = ${_.map(plugins, 'postcssPlugin').join(', ')}`)
  const result = await postcss(plugins).process(rawCss, { ...options, from: undefined })

  log('[progress] read css done.')

  const root = postcssJs.objectify(postcss.parse(result))

  log('[progress] objectify css done.')

  const classes = _.pickBy(root, onlyClassSelector)

  // Prettify and write styles as JSON.
  let obj = {
    css: result.css,
    classes: transform(classes)
  }

  if (pkg === PKG_TAILWIND) {
    ensureExists(tailwindJsPath)
    const { screens } = require(tailwindJsPath)
    obj.options = {
      screens: transform(screens)
    }
  }

  const json = JSON.stringify(obj, null, 2)

  // Crete directory if needed.
  mkdirp.sync(path.dirname(STYLES_JSON_PATH))

  // Then write to file.
  fs.writeFileSync(STYLES_JSON_PATH, json, { encoding: 'utf8' })

  log(`[end]'${prettyBytes(json.length)}' written.`)
}
