import React from 'react' // eslint-disable-line
import _ from 'lodash'
import loadable from 'loadable-components'
// import pagesJson from '@app/pages.json'

const Loading = () => (
  <div>Loading...</div>
)

const pagesJson = [
  'foo',
  'bar',
  'baz'
]

// Parse pages.json and create Loadable components.
export default _.transform(pagesJson, (result, module) => {
  result[`/${_.toLower(module)}`] = loadable(() => import(`@app/src/pages/${module}`), { LoadingComponent: Loading })
}, {})