import React from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import _ from 'lodash'

import Default404 from './404'

export default ({ options = {} }) => {
  const { Pages } = options

  return (
    <>
      <Helmet>
        <title>React SSR Example</title>
      </Helmet>

      <Switch>
        {_.map(Pages, (Component, path) => (
          <Route exact key={path} path={path} component={Component} />
        ))}
        <Route path='*' component={Default404} />
      </Switch>
    </>
  )
}
