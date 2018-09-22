import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { loadComponents } from 'loadable-components'

import * as components from 'src/components'
const { DefaultApp: App } = components

export default async (selector = '#app', options = {}) => {
  await loadComponents()

  const app = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )

  ReactDOM.hydrate(app, document.querySelector(selector))
}