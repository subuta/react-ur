import React from 'react'
import { hot } from 'react-hot-loader'
import { Helmet } from 'react-helmet'

import Header from '../../../components/Header'

const Hoge = () => {
  return (
    <>
      <Helmet>
        <title>Bar - Hoge | react-ur example</title>
      </Helmet>

      <Header />

      <h1>Bar - Hoge</h1>
    </>
  )
}

export default hot(module)(Hoge)
