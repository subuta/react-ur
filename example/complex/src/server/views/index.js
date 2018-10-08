import React from 'react'
import Router from 'koa-router'
import Boom from 'boom'
import _ from 'lodash'

import { asyncRenderServer } from 'react-ur'

import App from '../../components/App'

const router = new Router()

router.get('*', async (ctx) => {
  let html = null

  try {
    html = await asyncRenderServer(ctx.url, { App })
  } catch (err) {
    // Handle expected(boom) error.
    if (Boom.isBoom(err)) {
      const payload = _.get(err, 'output.payload', {})

      if (payload.statusCode === 404) {
        // Redirect to 404 page.
        return ctx.redirect('/404')
      }
    }

    // Redirect to 503 page by default.
    console.error(err)
    return ctx.redirect('/503')
  }

  ctx.body = html
})

export default router
