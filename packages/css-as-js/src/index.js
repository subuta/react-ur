import _ from 'lodash'

const {
  ruleCss,
  classes
} = require('@app/styles.json')

const apply = (...classNames) => {
  // Allow space separated '.hoge .fuga' syntax.
  if (classNames.length === 1) {
    classNames = classNames[0].split(' ')
  }

  const styles = _.compact(_.map(classNames, (className) => {
    let styles = classes[className]

    // Allow omit class selector(`.`).
    if (!styles && _.has(classes, `.${className}`)) {
      styles = classes[`.${className}`]
    }

    return styles
  }))

  return _.reduce(styles, (result, styles, __) => ({
    ...result,
    ...styles
  }), {})
}

export {
  ruleCss,
  classes,

  apply
}

export default {
  ruleCss,
  classes,

  apply
}
