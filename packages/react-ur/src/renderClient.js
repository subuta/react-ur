import React from 'react' // eslint-disable-line

import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { loadComponents } from 'loadable-components'

import DefaultApp from './components/App'

import Context from './components/Context'

import getPages from './utils/pages'

export default async (selector = '#app', options = {}) => {
  const pages = getPages()

  const App = options.App || DefaultApp

  await loadComponents()

  const appCtx = {
    pages
  }

  const app = (
    <BrowserRouter>
      <Context.Provider value={appCtx}>
        <App />
      </Context.Provider>
    </BrowserRouter>
  )

  ReactDOM.hydrate(app, document.querySelector(selector))
}