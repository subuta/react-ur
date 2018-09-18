import Router from 'koa-router'

import { asyncRenderServer } from 'react-ur'

const router = new Router()

router.get('*', async (ctx) => {
  ctx.body = await asyncRenderServer(ctx.url)
})

export default router
