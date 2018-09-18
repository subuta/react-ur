import React from 'react'
import { Helmet } from 'react-helmet'
import { hot } from 'react-hot-loader'
// import { Switch, Route } from 'react-router-dom'
// import _ from 'lodash'

import Counter from './Counter'
// import Default404 from './404'

export default hot(module)(({ options = {} }) => {
  return (
    <>
      <Helmet>
        <title>React SSR Example</title>
      </Helmet>

      <div>Foo!</div>

      <Counter />
    </>
  )
})
