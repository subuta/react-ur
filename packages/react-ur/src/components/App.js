import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import _ from 'lodash'
import { Helmet } from 'react-helmet'
import { hot } from 'react-hot-loader'

import Counter from './Counter'
import Page from './Page'

const App = (props) => {
  const {
    pages
  } = props

  return (
    <div>
      <Helmet>
        <title>React SSR Example</title>
      </Helmet>

      <div style={{ background: '#eebdbd', padding: 8, margin: 8 }}>
        <h1>[react-ur]Hello world!</h1>

        <Counter />

        <div style={{ border: '1px solid black' }}>
          {_.map(pages, (value, path) => (
            <Link key={path} to={path} style={{ margin: '0 8px 0 0' }}>{path}</Link>
          ))}
          <Link to="/not-exists" style={{ margin: '0 8px 0 0' }}>Not exists</Link>
        </div>

        <Page pages={props.pages} page404={props.page404} />
      </div>
    </div>
  )
}

export default hot(module)(App)
