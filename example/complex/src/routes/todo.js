import React from 'react'
import { Helmet } from 'react-helmet'
import { hot } from 'react-hot-loader'

export default hot(module)((props) => {
  return (
    <>
      <Helmet>
        <title>Todo | react-ur example</title>
      </Helmet>

      <h1>Todo</h1>
    </>
  )
})