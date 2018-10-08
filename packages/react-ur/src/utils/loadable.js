import React from 'react'
import _ from 'lodash'

import {
  getInitialPropsFromContext
} from './initialProps'

import asRoute from '../hocs/asRoute'
import unwrapModule from './unwrapModule'

export const renderLoadable = ({ Component, loading, error, ownProps }) => {
  if (loading) return <div>Loading...</div>
  if (error) return <div>Oops! {error.message}</div>

  // Get react-router's staticContext.
  const context = _.get(ownProps, 'staticContext', {})
  let initialProps = getInitialPropsFromContext(context)

  return <Component {...initialProps} {...ownProps} />
}

export const wrapLoadable = (module) => {
  return asRoute(unwrapModule(module))
}