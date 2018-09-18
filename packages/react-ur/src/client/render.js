import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import * as components from 'src/components'

const { DefaultApp: App } = components

export default (selector = '#app') => {
  const app = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )

  ReactDOM.render(app, document.querySelector(selector))
}