import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { loadComponents } from 'loadable-components'

import * as components from 'src/components'

const { DefaultApp: App } = components

export default async (selector = '#app', options = {}) => {
  console.log('options = ', options.app)

  const app = options.app

  // await loadComponents()

  ReactDOM.hydrate(options.app, document.querySelector(selector))
}