import React from 'react' // eslint-disable-line

import Pages from 'src/pages'
import { BrowserRouter } from 'react-router-dom'

import { loadComponents } from 'loadable-components'

import App from 'src/components/App'

import { renderClient } from 'react-ur'

const app = (
  <BrowserRouter>
    <App options={{ Pages }} />
  </BrowserRouter>
)

console.log('Render loaded react component(via umd)')
loadComponents().then(() => {
  renderClient('#app', { Pages, app })
})

if (module.hot) {
  // console.clear()
  module.hot.accept()
}
