import React from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import _ from 'lodash'

import Default404 from './404'

export default hot(module)(({ options = {} }) => {
  return (
    <div>
      <Helmet>
        <title>React SSR Example</title>
      </Helmet>

      <Switch>
        <Route path='*' component={Default404} />
      </Switch>
    </div>
  )
})
