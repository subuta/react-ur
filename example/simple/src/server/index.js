import Koa from 'koa'
import logger from 'koa-logger'
import serve from 'koa-static'

import { asyncRenderServer } from 'react-ur'
import { generateRoutesJson } from 'react-ur-tools'

const {
  PORT
} = process.env

generateRoutesJson(true)

const port = parseInt(PORT, 10) || 3000
const app = new Koa()

// Log requests
app.use(logger())

// Try PUBLIC_DIR first
app.use(serve('../public'))

app.use(async ctx => {
  ctx.body = await asyncRenderServer(ctx.url)
})

// Error handler.
const onError = (err) => {
  // Ignore error for route add/delete.
  if (err.message.match(/Cannot find module '.*\/routes(\/.*)\.js'/)) {
    const matched = err.message.match(/Cannot find module '.*\/routes(\/.*)\.js'/)
    console.log(`Route '${matched[1]}' deleted.`)
    return
  }
  console.error('err = ', err)
}

app.on('error', onError)
process.on('uncaughtException', onError)

// Serve the files on port.
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
