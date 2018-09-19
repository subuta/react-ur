import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable'

import * as components from 'src/components'
const { DefaultApp: App } = components

export default async (selector = '#app', options = {}) => {
  await Loadable.preloadReady()

  const app = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )

  ReactDOM.hydrate(app, document.querySelector(selector))
}