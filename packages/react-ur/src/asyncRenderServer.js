import React from 'react'

import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router-dom'
import { getBundles } from 'react-loadable/webpack'
import fs from 'fs'

import Loadable from 'react-loadable'

import {
  renderToString,
  renderToStaticMarkup
} from 'react-dom/server'

import getPath from 'src/utils/getPath'
import { isBrowser } from 'src/utils/env'

import * as components from 'src/components'

const { DefaultDocument: Document, DefaultApp: App } = components

let stats = {}
if (!isBrowser) {
  stats = JSON.parse(fs.readFileSync('./dist/react-loadable.json'))
}

export default async (url, options = {}) => {
  await Loadable.preloadAll()

  // Common context that will shared between modules while rendering.
  const ctx = {
    url
  }

  let modules = []

  const app = (
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <StaticRouter context={{ ctx }} location={getPath(ctx)}>
        <App />
      </StaticRouter>
    </Loadable.Capture>
  )

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

  let bundles = getBundles(stats, modules)
  bundles = bundles.filter(bundle => bundle.file.endsWith('.js'))

  bundles = bundles.map(bundle => (
    <script key={bundle.id} src={`${bundle.publicPath}`} />
  ))

  // Script tag for react-loadable.
  const bodyScripts = (
    <>
      {bundles}
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