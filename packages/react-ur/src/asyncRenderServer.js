import React from 'react'

import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router-dom'

import {
  renderToString,
  renderToStaticMarkup
} from 'react-dom/server'

import { getLoadableState } from 'loadable-components/server'

import getPath from 'src/utils/getPath'

import * as components from 'src/components'

const { DefaultApp: App, DefaultDocument: Document } = components

export default async (url, options = {}) => {
  // Common context that will shared between modules while rendering.
  const ctx = {
    url
  }

  const app = options.app

  // // Wait for loadable-components.
  // const loadableState = await getLoadableState(app)
  const loadableState = options.loadableState

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