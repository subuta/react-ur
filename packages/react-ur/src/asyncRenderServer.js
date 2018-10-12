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
import routes from './utils/routes'

import DefaultApp from './components/App'
import DefaultDocument from './components/Document'

import Context from './components/Context'

export default async (url, options = {}) => {

  const App = options.App || DefaultApp
  const Document = options.Document || DefaultDocument
  const onAfterRender = options.onAfterRender || _.noop

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

  const { route, match } = routes.findRoute(getPath(ctx))
  const { Component } = route

  // Call getInitialProps of Route if defined.
  // Fetch initialProps and remember it in ctx.
  const initialProps = Component ? (await getInitialPropsFromComponent(Component, getPath(ctx), { match })) : {}
  rememberInitialProps(initialProps, ctx)

  const html = renderToString(app)

  // Call onAfterRender to fetch result.
  const onAfterRenderResult = onAfterRender()

  // Clear remembered promise while render.
  forgetPromise()

  const helmet = Helmet.renderStatic()

  const head = (
    <>
      {_.get(onAfterRenderResult, 'head', null)}
      {helmet.base.toComponent()}
      {helmet.link.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.script.toComponent()}
      {helmet.style.toComponent()}
      {helmet.title.toComponent()}
    </>
  )

  // Script tag for loadable-components.
  const loadableStateScript = loadableState.getScriptElement()
  // Script tag for initialProps.
  const initialPropsScript = getInitialPropsScriptElement(ctx)

  // Script tag for react-loadable.
  const body = (
    <>
      {_.get(onAfterRenderResult, 'body', null)}
      {loadableStateScript}
      {initialPropsScript}
    </>
  )

  let responseHTML = renderToStaticMarkup(
    <Document
      htmlAttributes={helmet.htmlAttributes.toComponent()}
      bodyAttributes={helmet.htmlAttributes.toComponent()}
      head={head}
      body={body}
      main={<div id='app' dangerouslySetInnerHTML={{ __html: html }} />}
    />
  )

  return '<!doctype html>\n' + responseHTML
}
