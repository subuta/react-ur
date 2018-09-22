import React from 'react'
import { Switch, Route } from 'react-router-dom'
import _ from 'lodash'
import { hot } from 'react-hot-loader'

import loadable from 'loadable-components'

const Loading = () => (
  <div>Loading...</div>
)

export const pages = {
  '/foo': loadable(() => import('./Foo'), { LoadingComponent: Loading, }),
  '/bar': loadable(() => import('./Bar'), { LoadingComponent: Loading, }),
  '/baz': loadable(() => import('./Baz'), { LoadingComponent: Loading, })
}

const Pages = ({ page404 }) => {
  return (
    <Switch>
      {_.map(pages, (Component, path) => (
        <Route exact key={path} path={path} component={Component} />
      ))}

      <Route exact path='*' component={page404} />
    </Switch>
  )
}

export default hot(module)(Pages)
