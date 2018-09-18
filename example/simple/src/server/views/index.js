import React from 'react'
import Router from 'koa-router'

import { asyncRenderServer } from 'react-ur'
import { StaticRouter } from 'react-router-dom'

import App from 'src/components/App'
import Pages from 'src/pages'

import { getLoadableState } from 'loadable-components/server'

const router = new Router()

router.get('*', async (ctx) => {
  const app = (
    <StaticRouter context={{ ctx }} location={ctx.url}>
      <App options={{ Pages }} />
    </StaticRouter>
  )

  // Wait for loadable-components.
  const loadableState = await getLoadableState(app)

  ctx.body = await asyncRenderServer(ctx.url, { Pages, app, loadableState })
})

export default router
