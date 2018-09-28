import Koa from 'koa'
import logger from 'koa-logger'
import koaBody from 'koa-body'
import serve from 'koa-static'
import clearModule from 'clear-module'
import path from 'path'

import {
  ROOT_DIR,
  PUBLIC_DIR
} from '../../config'

import { generateRoutesJson } from 'react-ur-tools'

const {
  PORT
} = process.env

const dev = process.env.NODE_ENV !== 'production'

generateRoutesJson(true)

const port = parseInt(PORT, 10) || 3000
const app = new Koa()

// log requests
app.use(logger())

// parse body
app.use(koaBody())

if (dev) {
  // Server side hot-module-replacement :)
  const watcher = require('sane')(path.resolve(ROOT_DIR, './src'))
  watcher.on('ready', () => {
    watcher.on('all', () => {
      console.log('Clearing src module cache from server')
      clearModule.match(/src/)
    })
  })
}

// try PUBLIC_DIR first
app.use(serve(PUBLIC_DIR))

// Register views routes/allowedMethods
if (dev) {
  // Dynamic import modules for development(With no-module-cache).
  // SEE: https://github.com/glenjamin/ultimate-hot-reloading-example/blob/master/server.js
  app.use((...args) => require('./views').default.routes().apply(null, args))
  app.use((...args) => require('./views').default.allowedMethods().apply(null, args))
} else {
  // Use modules statically otherwise (prod/test).
  const views = require('./views').default
  app.use(views.routes())
  app.use(views.allowedMethods())
}

const onError = (err) => {
  // Ignore error for page deletion.
  if (err.message.match(/Cannot find module '.*\/pages(\/.*)\.js'/)) {
    const matched = err.message.match(/Cannot find module '.*\/pages(\/.*)\.js'/)
    console.log(`Page '${matched[1]}' deleted.`)
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
