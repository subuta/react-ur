import React from 'react' // eslint-disable-line

import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { loadComponents } from 'loadable-components'

import Pages from '@app/pages'
import pages from 'src/utils/pages'

import * as components from 'src/components'
const { DefaultApp: App, Default404 } = components

export default async (selector = '#app', options = {}) => {
  await loadComponents()

  const app = (
    <BrowserRouter>
      <App>
        <Pages pages={pages} page404={Default404} />
      </App>
    </BrowserRouter>
  )

  ReactDOM.hydrate(app, document.querySelector(selector))
}