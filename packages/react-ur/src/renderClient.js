import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import * as components from 'src/components'

export default async (selector = '#app', options = {}) => {
  const App = options.App || components.DefaultApp

  const app = (
    <BrowserRouter>
      <App options={options} />
    </BrowserRouter>
  )

  ReactDOM.hydrate(app, document.querySelector(selector))
}