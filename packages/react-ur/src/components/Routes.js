import React from 'react'
import { Switch, Route } from 'react-router-dom'
import _ from 'lodash'

import withContext from '../hocs/withContext'

export default withContext((props) => {
  const configure = props.configure || (r => r.inject404())
  return (
    <Switch>
      {_.map(configure(props.routes).toJSON(), ([path, route]) => {
        // 404(*) page must be rendered without path.
        if (path === '*') {
          path = null
        }
        return (
          <Route
            exact={route.exact || false}
            key={path}
            path={path}
            component={route.Component}
          />
        )
      })}
    </Switch>
  )
})
