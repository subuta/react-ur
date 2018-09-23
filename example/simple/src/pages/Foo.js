import React from 'react'

import Counter from '../components/Counter'
import { hot } from 'react-hot-loader'

export default hot(module)(() => {
  return (
    <>
      <h1>Foo</h1>

      <Counter />
    </>
  )
})