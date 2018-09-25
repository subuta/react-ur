import React from 'react'
import { Helmet } from 'react-helmet'

import Counter from '../components/Counter'
import { hot } from 'react-hot-loader'

export default hot(module)(() => {
  return (
    <>
      <Helmet>
        <title>Foo | react-ur example</title>
      </Helmet>

      <h1>Foo</h1>

      <Counter />
    </>
  )
})