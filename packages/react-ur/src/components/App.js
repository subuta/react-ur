import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import _ from 'lodash'
import { Helmet } from 'react-helmet'
import Pages from '@app/pages'
import { hot } from 'react-hot-loader'

import Counter from './Counter'
import Default404 from './404'

const App = () => {
  return (
    <div>
      <Helmet>
        <title>React SSR Example</title>
      </Helmet>

      <div style={{ background: '#eebdbd', padding: 8, margin: 8 }}>
        <h1>[react-ur]Hello world!</h1>

        <Counter />

        <div style={{ border: '1px solid black' }}>
          <Link to="/foo" style={{ margin: '0 8px 0 0' }}>Foo</Link>
          <Link to="/bar" style={{ margin: '0 8px 0 0' }}>Bar</Link>
          <Link to="/baz" style={{ margin: '0 8px 0 0' }}>Baz</Link>
        </div>

        <Pages page404={Default404} />
      </div>
    </div>
  )
}

export default hot(module)(App)
