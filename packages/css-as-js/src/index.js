import _ from 'lodash'

const dev = process.env.NODE_ENV !== 'production'

// Remove cached json while development.
if (dev) {
  delete require.cache[require.resolve('@app/tmp/styles.json')]
}

let json = {}

// Skip load styles.json at testing.
if (process.env.NODE_ENV !== 'test') {
  json = require('@app/tmp/styles.json')
}

// State variants.
const VARIANTS = [
  'hover',
  'focus',
  'active'
]

// Match className selector with variants(eg: `.hover:text-red`).
const VARIANTS_REGEX = new RegExp(`(${VARIANTS.join('|')})?:?(-?[_a-zA-Z]+[_a-zA-Z0-9-]+)`)

class CssAsJs {
  constructor (json) {
    const { css, classes, options = {} } = json

    // Use default screens if not defined in stlyes.json.
    this.screens = options.screens || {
      'sm': 576,
      'md': 768,
      'lg': 992,
      'xl': 1200,
    }

    // Set other variables.
    this.css = css || ''
    this.classes = classes || {}

    // Bind this to public API(for allow destructuring).
    this.apply = this.apply.bind(this)
    this.normalizeClassNames = this.normalizeClassNames.bind(this)
    this.screen = this.screen.bind(this)
    this.variants = this.variants.bind(this)
    this.merge = this.merge.bind(this)
  }

  normalizeClassNames (classNames) {
    // Allow space separated '.hoge .fuga' syntax.
    if (classNames.length === 1) {
      classNames = classNames[0].split(' ')
    }

    classNames = _.map(classNames, (className) => {
      // Allow prefixed by class selector(`.`).
      if (_.startsWith(className, '.')) {
        className = _.trimStart(className, '.')
      }
      return className
    })

    return classNames
  }

  apply (...classNames) {
    let styles = _.fromPairs([..._.map(VARIANTS, (key) => ([key, {}])), ['default', {}]])

    let result = _.transform(this.normalizeClassNames(classNames), (result, className) => {
      const match = className.match(VARIANTS_REGEX)

      if (_.get(match, 1)) {
        _.merge(result[match[1]], this.classes[`.${match[2]}`])
      } else {
        _.merge(result['default'], this.classes[`.${className}`])
      }
    }, styles)

    result = _.reduce(result, (result, value, key) => {
      if (key === 'default') {
        return { ...result, ...value }
      }
      return { ...result, [`&:${key}`]: value }
    }, {})

    // Omit empty styles.
    return _.omitBy(result, styles => _.isEqual(styles, {}))
  }

  screen (size, styles) {
    if (!_.has(this.screens, size)) {
      throw new Error(`Unknown screen size(${size}) passed.`)
    }

    size = this.screens[size]

    if (_.isNumber(size)) {
      size += 'px'
    }

    return {
      [`@media (min-width: ${size})`]: styles
    }
  }

  variants (variants, styles) {
    if (_.isString(variants)) {
      variants = variants.split(' ')
    }

    return _.transform(variants, (result, variant) => {
      result[`&:${variant}`] = styles
    }, {})
  }

  merge (...styles) {
    return _.reduce(styles, (merged, style) => _.merge(merged, style), {})
  }
}

export default new CssAsJs(json)
