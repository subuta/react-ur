import React from 'react'
import Router from 'koa-router'

import { asyncRenderServer } from 'react-ur'

import App from '../../components/App'

const router = new Router()

router.get('*', async (ctx) => {
  ctx.body = await asyncRenderServer(ctx.url, { App })
})

export default router
