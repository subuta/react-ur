import React from 'react'
import { Helmet } from 'react-helmet'
import { hot } from 'react-hot-loader'
// import { Switch, Route } from 'react-router-dom'
// import _ from 'lodash'

import Counter from './Counter'
// import Default404 from './404'

const App = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>React SSR Example</title>
      </Helmet>

      <div style={{ background: '#eebdbd', padding: 8, margin: 8 }}>
        <h1>[simple-app]Hello world!</h1>

        <Counter />
      </div>

      {children}
    </>
  )
}

export default hot(module)(App)
