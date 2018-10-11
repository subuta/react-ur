import React from 'react' // eslint-disable-line

import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { loadComponents } from 'loadable-components'

import DefaultApp from './components/App'

import Context from './components/Context'

import getRoutes from './utils/routes'
import { dev, isBrowser } from './utils/env'

const routes = getRoutes()

if (dev && isBrowser) {
  // Add debug tools.
  window.rur = {
    routes: () => routes.pp(),
    currentRoute: () => routes.currentRoute(),
  }
}

export default async (selector = '#app', options = {}) => {
  const App = options.App || DefaultApp

  await loadComponents()

  const appCtx = {
    routes
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
