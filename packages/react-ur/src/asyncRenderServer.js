import React from 'react'
import _ from 'lodash'

import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router-dom'

import { getLoadableState } from 'loadable-components/server'

import {
  renderToString,
  renderToStaticMarkup
} from 'react-dom/server'

import {
  getInitialPropsFromComponent,
  rememberInitialProps,
  forgetPromise,
  getScriptElement as getInitialPropsScriptElement
} from './utils/initialProps'

import getPath from './utils/getPath'
import getRoutes from './utils/routes'

import DefaultApp from './components/App'
import DefaultDocument from './components/Document'

import Context from './components/Context'

export default async (url, options = {}) => {
  const routes = getRoutes()

  const App = options.App || DefaultApp
  const Document = options.Document || DefaultDocument

  // Common context that will shared between modules while rendering.
  const ctx = {
    url
  }

  const appCtx = {
    routes,
  }

  const app = (
    <StaticRouter context={{ ctx }} location={getPath(ctx)}>
      <Context.Provider value={appCtx}>
        <App />
      </Context.Provider>
    </StaticRouter>
  )

  // Wait for loadable-components.
  const loadableState = await getLoadableState(app)

  const Route = _.get(routes.findRoute(getPath(ctx), true), 'Component', null)

  // Call getInitialProps of Route if defined.
  // Fetch initialProps and remember it in ctx.
  const initialProps = Route ? (await getInitialPropsFromComponent(Route, getPath(ctx))) : {}
  rememberInitialProps(initialProps, ctx)

  const html = renderToString(app)

  // Clear remembered promise while render.
  forgetPromise()

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
  // Script tag for initialProps.
  const initialPropsScript = getInitialPropsScriptElement(ctx)

  // Script tag for react-loadable.
  const bodyScripts = (
    <>
      {loadableStateScript}
      {initialPropsScript}
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