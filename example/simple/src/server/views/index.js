import React from 'react'
import Router from 'koa-router'

import Pages from 'src/pages'
import { asyncRenderServer } from 'react-ur'

const router = new Router()

router.get('*', async (ctx) => {
  ctx.body = await asyncRenderServer(ctx.url, { Pages })
})

export default router
