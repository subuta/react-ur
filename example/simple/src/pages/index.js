import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Counter from 'src/components/Counter'
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

const Pages = () => {
  return (
    <>
      <div style={{ background: '#EEEEEE', padding: 8, margin: 8 }}>
        <h1>[simple]Hello world!</h1>

        <Counter />

        <div style={{ border: '1px solid black' }}>
          <Link to="/foo" style={{ margin: '0 8px 0 0' }}>Foo</Link>
          <Link to="/bar" style={{ margin: '0 8px 0 0' }}>Bar</Link>
          <Link to="/baz" style={{ margin: '0 8px 0 0' }}>Baz</Link>
        </div>

        <Switch>
          {_.map(pages, (Component, path) => (
            <Route exact key={path} path={path} component={Component} />
          ))}
        </Switch>
      </div>
    </>
  )
}

export default hot(module)(Pages)
