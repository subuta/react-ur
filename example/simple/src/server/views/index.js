import React from 'react'
import Router from 'koa-router'

import App from 'src/components/App'
import Pages from 'src/pages'
import { asyncRenderServer } from 'react-ur'

import Loadable from 'react-loadable'

const router = new Router()

router.get('*', async (ctx) => {
  await Loadable.preloadAll()
  ctx.body = await asyncRenderServer(ctx.url, { Pages, App })
})

export default router
