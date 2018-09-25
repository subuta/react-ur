import React from 'react'

import Page from './Page'
import Context from './Context'

const App = (props) => {
  return (
    <Context.Provider value={props.context}>
      <Page />
    </Context.Provider>
  )
}

export default App
