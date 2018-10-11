import _ from 'lodash'
import postcss from 'postcss'
import postcssJs from 'postcss-js'
import prettyBytes from 'pretty-bytes'
import debug from 'debug'

import fs from 'fs'

import {
  STYLES_PATH
} from '../config'

import postcssrc from 'postcss-load-config'

// Log to stdout.
let log = debug('app:log')
log.log = console.log.bind(console)

const transform = (root) => {
  // Ignore array and non-objects(scalar).
  if (_.isArray(root) || !_.isObject(root)) return root

  return _.transform(root, (result, value, key) => {
    // Ignore non-standard mozila pseudo-class
    // SEE: https://developer.mozilla.org/en-US/docs/Web/CSS/:-moz-focusring
    if (key.match(/(?<!:):(?!:)-moz/)) return

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

const onlyClassSelector = (value, key) => _.startsWith(key, '.')

module.exports = async () => {
  log('[start] css-as-json')

  if (!fs.existsSync(STYLES_PATH)) {
    throw new Error(`'styles.css' not found. must be located at '${STYLES_PATH}'`)
  }

  const stylesCss = fs.readFileSync(STYLES_PATH, 'utf8')

  const { plugins, options } = await postcssrc()
  const css = await postcss(plugins).process(stylesCss, options)

  const root = postcssJs.objectify(postcss.parse(css))

  const rules = _.omitBy(root, onlyClassSelector)
  const classes = _.pickBy(root, onlyClassSelector)

  const ruleCss = (await postcss().process(rules, { parser: postcssJs })).css

  // Prettify and write styles as JSON.
  const stylesJson = JSON.stringify({
    ruleCss: ruleCss,
    classes: transform(classes)
  }, null, 2)

  fs.writeFileSync('./styles.json', stylesJson, { encoding: 'utf8' })

  log(`[end] css-as-json. '${prettyBytes(stylesJson.length)}' written.`)
}
