import React from 'react'
import { Switch, Route } from 'react-router-dom'
import _ from 'lodash'

import withContext from '../hocs/withContext'
import { inject404 } from '../utils/pages'

export default withContext((props) => {
  const configure = props.configure || (p => p)
  return (
    <Switch>
      {_.map(inject404(configure(props.pages)), ([path, Component]) => {
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
