import React from 'react'
import { hot } from 'react-hot-loader'
import { Helmet } from 'react-helmet'

import Header from '../../components/Header'

export default hot(module)(() => {
  return (
    <>
      <Helmet>
        <title>Bar | react-ur example</title>
      </Helmet>

      <Header />

      <h1>Bar</h1>
    </>
  )
})