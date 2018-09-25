import React from 'react'
import { Helmet } from 'react-helmet'
import { hot } from 'react-hot-loader'

export default hot(module)(() => {
  return (
    <>
      <Helmet>
        <title>Todos | react-ur example</title>
      </Helmet>

      <h1>Todos</h1>
    </>
  )
})