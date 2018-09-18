import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'

import { components } from 'react-ur'

console.log('components =', components)

const { App } = components

const app = (
  <App />
)

console.log('Render loaded react component(via umd)')
ReactDOM.render(app, document.querySelector('#app'))

if (module.hot) {
  module.hot.accept()
}