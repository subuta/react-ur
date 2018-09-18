import React from 'react' // eslint-disable-line

import { render } from 'react-ur'

console.log('Render loaded react component(via umd)')
render('#app')

if (module.hot) {
  module.hot.accept()
}