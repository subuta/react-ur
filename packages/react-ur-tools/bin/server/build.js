#!/usr/bin/env node

// Pass-through to babel.
// SEE: https://github.com/babel/babel/blob/master/packages/babel-cli/src/babel/index.js
const parseArgv = require('@babel/cli/lib/babel/options').default
const dirCommand = require('@babel/cli/lib/babel/dir').default

// Manually pass modified argv.
const opts = parseArgv([process.argv[0], process.argv[1], 'src', '--out-dir', 'dist'])

dirCommand(opts).catch(err => {
  console.error(err)
  process.exit(1)
})