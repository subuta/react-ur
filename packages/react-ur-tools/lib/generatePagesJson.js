import _ from 'lodash'
import glob from 'glob'
import sane from 'sane'

import fs from 'fs'

import {
  PAGES_DIR,
  PAGES_JSON_PATH
} from '../config.js'

const dev = process.env.NODE_ENV !== 'production'

// Find page-components from `/pages`
export default (watch = false) => {
  const generatePagesJson = () => {
    // Find directories from `/pages`
    const directories = _.map(glob.sync('**/', { cwd: PAGES_DIR }), (dir) => _.trimEnd(dir, '/'))

    // Find files from `/pages`
    const files = _.map(glob.sync('**/*.js', {
      cwd: PAGES_DIR,
      ignore: ['**/_*.js', '**/index.js']
    }), (file) => _.trimEnd(file, '.js'))

    // Concat and normalize as path name. (eg: `foo`)
    const pages = _.map([...files, ...directories], (page) => _.toLower(page))

    // Write pages as json.
    fs.writeFileSync(PAGES_JSON_PATH, JSON.stringify(pages), { encoding: 'utf8' })
    console.log('pages.json generated.')
  }

  generatePagesJson()

  // Run /src/pages watcher if dev.
  if (dev && watch) {
    console.log(`Start watching changes at ${PAGES_DIR}`)

    // Watch for /pages changes.
    const watcher = sane(PAGES_DIR, { ignored: ['./index.js'] })

    const onChange = () => {
      generatePagesJson()
    }

    watcher.on('ready', () => {
      watcher.on('add', onChange)
      watcher.on('delete', onChange)
    })
  }
}
