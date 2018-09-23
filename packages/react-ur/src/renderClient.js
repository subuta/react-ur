import React from 'react' // eslint-disable-line
import _ from 'lodash'

import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { loadComponents } from 'loadable-components'

import * as components from './components'
const { DefaultApp: App, Default404 } = components

import getPages from './utils/pages'

export default async (selector = '#app', options = {}) => {
  const pages = getPages()
  console.log('pages[browser] = ', _.keys(pages))

  await loadComponents()

  const app = (
    <BrowserRouter>
      <App pages={pages} page404={Default404} />
    </BrowserRouter>
  )

  ReactDOM.hydrate(app, document.querySelector(selector))
}