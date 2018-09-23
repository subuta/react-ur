import React from 'react' // eslint-disable-line
import _ from 'lodash'
import loadable from 'loadable-components'

const Loading = () => (
  <div>Loading...</div>
)

const modules = [
  'Foo',
  'Bar',
  'Baz'
]

export default _.transform(modules, (result, module) => {
  result[`/${_.toLower(module)}`] = loadable(() => import(`@app/pages/${module}`), { LoadingComponent: Loading })
}, {})