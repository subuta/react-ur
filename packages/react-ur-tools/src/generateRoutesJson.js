import _ from 'lodash'
import glob from 'glob'
import sane from 'sane'
import path from 'path'

import fs from 'fs'

import {
  ROUTES_DIR,
  ROUTES_JSON_PATH
} from '../config.js'

const dev = process.env.NODE_ENV !== 'production'

// Find route-components from `/routes`
export default (watch = false) => {
  const generateRoutesJson = () => {
    // Find directories from `/routes`
    const directories = _.map(glob.sync('**/', { cwd: ROUTES_DIR }), (dir) => _.trimEnd(dir, '/'))

    // Find files from `/routes`
    let files = _.map(glob.sync('**/*.js', {
      cwd: ROUTES_DIR,
      ignore: ['**/_*.js', '**/index.js']
    }), (file) => {
      const dir = path.dirname(file)
      const base = path.basename(file, '.js')

      if (dir === '.') return base
      return `${dir}/${base}`
    })

    // Check for index(/) route.
    if (fs.existsSync(path.resolve(ROUTES_DIR, './index.js'))) {
      files.unshift('index')
    }

    // Concat and normalize as path name. (eg: `foo`)
    const routes = _.uniq(_.map([...directories, ...files], (route) => _.toLower(route)))

    // Write routes as json.
    fs.writeFileSync(ROUTES_JSON_PATH, JSON.stringify(routes), { encoding: 'utf8' })
    console.log('routes.json generated.')
  }

  generateRoutesJson()

  // Run /src/routes watcher if dev.
  if (dev && watch) {
    console.log(`Start watching changes at ${ROUTES_DIR}`)

    // Watch for /routes changes.
    const watcher = sane(ROUTES_DIR, { ignored: ['./index.js'] })

    const onChange = () => {
      generateRoutesJson()
    }

    watcher.on('ready', () => {
      watcher.on('add', onChange)
      watcher.on('delete', onChange)
    })
  }
}
