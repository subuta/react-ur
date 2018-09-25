import React from 'react' // eslint-disable-line
import _ from 'lodash'
import loadable from 'loadable-components'

import Default404 from '../components/404'

import { dev, isBrowser } from './env'

import {
  wrapLoadable,
  renderLoadable
} from './loadable'

if (isBrowser && module.hot) {
  module.hot.dispose(function () {
    console.log('Force reload browser because pages added or deleted ...')
    // Force browser to detect changes of pages.
    location.reload()
  })
}

export const inject404 = (pages) => {
  // Defaults to react-ur's 404 page.
  const page404 = pages['/404'] || Default404

  // Temporary remove wildcard(default) route from pages.
  pages = _.omit(pages, ['/404'])

  // Cast to Map for preserve key order.
  let pagesMap = new Map(_.toPairs(pages))

  // Append 404 page(to last).
  pagesMap.set('/404', page404)

  return Array.from(pagesMap.entries())
}

// Parse pages.json and create Loadable components.
export default () => {
  // Remove cached json while development.
  if (dev) {
    delete require.cache[require.resolve('@app/pages.json')]
  }

  // Retrieve latest pages.json.
  const pagesJson = require('@app/pages.json')

  return _.transform(pagesJson, (result, module) => {
    result[`/${_.toLower(module)}`] = loadable(async () => wrapLoadable(await import(`@app/src/pages/${module}`)), { render: renderLoadable })
  }, {})
}