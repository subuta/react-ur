import React from 'react' // eslint-disable-line
import Loadable from 'react-loadable'

import Pages from 'src/pages'
import { renderClient } from 'react-ur'

Loadable.preloadReady().then(() => {
  console.log('Render loaded react component(via umd)')
  renderClient('#app', { Pages })
})

if (module.hot) {
  // console.clear()
  module.hot.accept()
}
