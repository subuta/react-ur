import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { components } from 'react-ur'

console.log('components =', components)

const { App } = components

console.log('Render loaded react component(via umd)')
console.log(renderToStaticMarkup(<App />))