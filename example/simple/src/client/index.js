import React from 'react' // eslint-disable-line
import Loadable from 'react-loadable'

import App from 'src/components/App'
import Pages from 'src/pages'
import { renderClient } from 'react-ur'

Loadable.preloadReady().then(() => {
  console.log('Render loaded react component(via umd)')
  renderClient('#app', { Pages, App })
})

if (module.hot) {
  // console.clear()
  module.hot.accept()
}
