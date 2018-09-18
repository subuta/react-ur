import React from 'react' // eslint-disable-line

import Pages from 'src/pages'
import { renderClient } from 'react-ur'

console.log('Render loaded react component(via umd)')
renderClient('#app', { Pages })

if (module.hot) {
  // console.clear()
  module.hot.accept()
}
