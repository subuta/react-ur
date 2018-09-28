#!/usr/bin/env node

const exitHook = require('async-exit-hook')
const program = require('commander')
const kill = require('tree-kill')
const fork = require('../lib/fork')

// CLI utilities.
program
  .command('start')
  .description('Start configured webpack dev-server.')
  .action(() => {
    // Start webpack-dev-server
    fork(require.resolve('./client/dev.js'))
    // Start es-enabled(polyfilled) node server process.
    fork(require.resolve('./server/entry.js'))
  })

program
  .command('build')
  .description('Transpile (and also bundle for client) client/server scripts for Production via webpack/babel')
  .action(() => {
    // Build client
    fork(require.resolve('./client/build.js'))
    // Build server
    fork(require.resolve('./server/build.js'))
  })

// error on unknown commands
program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '))
  process.exit(1)
})

program.parse(process.argv)

const pid = process.pid

exitHook((cb) => {
  console.log('\r\nTry to exit with all child process.')
  kill(pid, (err) => {
    if (err) {
      console.error(err)
      return process.exit(1)
    }
    console.log('Exiting successfully.')
    cb()
    process.exit(0)
  })
})