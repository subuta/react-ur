import 'regenerator-runtime/runtime'

import React from 'react' // eslint-disable-line

import { renderClient } from 'react-ur'

console.log('Render loaded react component(via umd)')
renderClient('#app')

if (module.hot) {
  // console.clear()
  module.hot.accept()
}
