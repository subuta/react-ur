import React from 'react'
import { hot } from 'react-hot-loader'
import { Helmet } from 'react-helmet'

import Header from '../components/Header'
import Counter from '../components/Counter'

export default hot(module)(() => {
  return (
    <>
      <Helmet>
        <title>Foo | react-ur example</title>
      </Helmet>

      <Header />

      <h1>Foo</h1>

      <Counter />
    </>
  )
})