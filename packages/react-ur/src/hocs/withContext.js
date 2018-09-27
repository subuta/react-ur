import React from 'react'

import Context from '../components/Context'

export default (Component) => {
  return (props) => (
    <Context.Consumer>
      {(ctx) => <Component {...ctx} {...props} />}
    </Context.Consumer>
  )
}