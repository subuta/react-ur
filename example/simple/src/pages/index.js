import React from 'react'
import { Switch, Route } from 'react-router-dom'
import _ from 'lodash'
import { hot } from 'react-hot-loader'

import loadable from 'loadable-components'

const Loading = () => (
  <div>Loading...</div>
)

const Pages = (props) => {
  const {
    pages,
    page404,
    transform = (p => p)
  } = props

  let pagesMap = new Map(_.toPairs(pages))
  pagesMap.set('*', page404)

  pagesMap = transform(pagesMap)

  const array = Array.from(pagesMap.entries())

  return (
    <Switch>
      {_.map(array, ([path, Component]) => {
        if (path === '*') {
          return <Route key={path} component={Component} />
        }

        return (
          <Route exact key={path} path={path} component={Component} />
        )
      })}
    </Switch>
  )
}

export default hot(module)(Pages)
