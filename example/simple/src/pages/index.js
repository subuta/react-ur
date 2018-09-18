import React from 'react'
import Counter from 'src/components/Counter'
import { hot } from 'react-hot-loader'

const Pages = () => {
  return (
    <>
      <div style={{ background: '#EEEEEE', padding: 8, margin: 8 }}>
        <h1>[simple]Hello world!</h1>

        <Counter />
      </div>
    </>
  )
}

export default hot(module)(Pages)
