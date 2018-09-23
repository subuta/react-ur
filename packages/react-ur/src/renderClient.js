import React from 'react' // eslint-disable-line

import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { loadComponents } from 'loadable-components'

import * as components from './components'
const { DefaultApp: App, Default404 } = components

import pages from './utils/pages'

export default async (selector = '#app', options = {}) => {
  await loadComponents()

  const app = (
    <BrowserRouter>
      <App pages={pages} page404={Default404} />
    </BrowserRouter>
  )

  ReactDOM.hydrate(app, document.querySelector(selector))
}