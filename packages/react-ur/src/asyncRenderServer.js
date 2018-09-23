import React from 'react'

import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router-dom'

import { getLoadableState } from 'loadable-components/server'

import {
  renderToString,
  renderToStaticMarkup
} from 'react-dom/server'

import getPath from './utils/getPath'
import pages from './utils/pages'

import * as components from './components'

const {
  DefaultDocument: Document,
  DefaultApp: App,
  Default404
} = components

export default async (url, options = {}) => {
  // Common context that will shared between modules while rendering.
  const ctx = {
    url
  }

  const app = (
    <StaticRouter context={{ ctx }} location={getPath(ctx)}>
      <App pages={pages} page404={Default404} />
    </StaticRouter>
  )

  // Wait for loadable-components.
  const loadableState = await getLoadableState(app)

  const html = renderToString(app)

  const helmet = Helmet.renderStatic()

  const scripts = (
    <>
      {helmet.title.toComponent()}
      {helmet.base.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.link.toComponent()}
      {helmet.style.toComponent()}
      {helmet.script.toComponent()}
    </>
  )

  // Script tag for loadable-components.
  const loadableStateScript = loadableState.getScriptElement()

  // Script tag for react-loadable.
  const bodyScripts = (
    <>
      {loadableStateScript}
    </>
  )

  let responseHTML = renderToStaticMarkup(
    <Document
      htmlAttributes={helmet.htmlAttributes.toComponent()}
      bodyAttributes={helmet.htmlAttributes.toComponent()}
      scripts={scripts}
      bodyScripts={bodyScripts}
      main={<div id='app' dangerouslySetInnerHTML={{ __html: html }} />}
    />
  )

  return '<!doctype html>\n' + responseHTML
}