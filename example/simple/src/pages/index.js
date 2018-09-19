import React from 'react'
import { Switch, Route } from 'react-router-dom'
import _ from 'lodash'
import { hot } from 'react-hot-loader'

import Loadable from 'react-loadable'

const loading = () => (
  <div>Loading...</div>
)

export const pages = {
  '/foo': Loadable({ loader: () => import('./Foo'), loading }),
  '/bar': Loadable({ loader: () => import('./Bar'), loading }),
  '/baz': Loadable({ loader: () => import('./Baz'), loading })
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
