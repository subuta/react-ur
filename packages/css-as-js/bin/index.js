#!/usr/bin/env node

const cssAsJson = require('../lib/cssAsJson')

const {
  ROOT_DIR
} = require('../config')

const sane = require('sane')

const dev = process.env.NODE_ENV !== 'production'

// Run /src/routes watcher if dev.
if (dev) {
  console.log(`Start watching changes at **/*.css`)

  // Watch for /routes changes.
  const watcher = sane(ROOT_DIR, {
    glob: ['**/*.css'],
    ignored: [ /node_modules/ ]
  })

  const onChange = () => {
    cssAsJson()
  }

  watcher.on('ready', () => {
    watcher.on('change', onChange)
  })
}

cssAsJson()
