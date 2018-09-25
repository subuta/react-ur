import React from 'react'
import { Switch, Route } from 'react-router-dom'
import _ from 'lodash'

import connect from '../hocs/connect'

import { inject404 } from '../utils/pages'

export default connect((props) => {
  const transform = props.transform || (p => p)
  return (
    <Switch>
      {_.map(inject404(transform(props.pages)), ([path, Component]) => {
        if (path === '/404') {
          return <Route key={path} component={Component} />
        }

        return (
          <Route exact key={path} path={path} component={Component} />
        )
      })}
    </Switch>
  )
})
