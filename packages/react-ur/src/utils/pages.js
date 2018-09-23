import React from 'react' // eslint-disable-line
import _ from 'lodash'
import loadable from 'loadable-components'

import { dev, isBrowser } from './env'

const Loading = () => (
  <div>Loading...</div>
)

if (isBrowser && module.hot) {
  module.hot.dispose(function () {
    console.log('Force reload browser because pages added or deleted ...')
    // Force browser to detect changes of pages.
    location.reload()
  })
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
    result[`/${_.toLower(module)}`] = loadable(() => import(`@app/src/pages/${module}`), { LoadingComponent: Loading })
  }, {})
}