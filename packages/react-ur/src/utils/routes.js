import React from 'react' // eslint-disable-line
import _ from 'lodash'
import loadable from 'loadable-components'
import { matchPath } from 'react-router'

import {
  setDisplayName
} from 'recompose'

import Default404 from '../components/404'

import { dev, isBrowser } from './env'

import {
  wrapLoadable,
  renderLoadable
} from './loadable'
import { getInitialPropsFromComponent } from './initialProps'

if (isBrowser && module.hot) {
  module.hot.dispose(function () {
    console.log('Force reload browser because routes added or deleted ...')
    // Force browser to detect changes of routes.
    location.reload()
  })
}

// react-router match compatible props.
const ROUTE_PROPS = ['path', 'exact']

class Routes {
  constructor (initialRoutes) {
    const defaultRoute404 = {
      path: '*',
      exact: false,
      module: 'react-ur/src/components/404.js',
      Component: Default404
    }

    // Defaults to react-ur's 404 route.
    this.route404 = initialRoutes['*'] || defaultRoute404

    // Temporary remove wildcard(default) route from routes.
    const routes = _.omit(initialRoutes, ['*'])

    // Cast to Map for preserve key order.
    this.routes = new Map(_.toPairs(routes))
  }

  // Pretty print routes to console(use console.table at Browser if supported.)
  prettyPrint () {
    const routes = _.map(this.toArray(), ([__, route]) => route)
    if (console.table) {
      return console.table(routes)
    }
    console.log(JSON.stringify(routes))
  }

  pp () {
    this.prettyPrint()
  }

  // Pre-fetch loadable component with pre-resolving initialProps.
  async preload (path) {
    const { route, match } = this.findRoute(path)
    if (!match) return

    // fetch component(bundle).
    const Component = await route.Component.load()
    // fetch initialProps of component.
    await getInitialPropsFromComponent(Component, path, { match })
  }

  findRoute (_path) {
    let result = {}
    // Try match with all routes and return at first occurrence.
    _.some(this.toArray(), ([path, route]) => {
      const match = matchPath(_path, _.pick(route, ROUTE_PROPS))

      if (match) {
        result = {
          match,
          route
        }
      }

      return match
    })
    return result
  }

  // Find current route by call react-router's matchPath.
  currentRoute () {
    return _.get(this.findRoute(location.pathname), 'match')
  }

  // Rename(re-map) path.
  rename (from, to) {
    // Ignore unknown path.
    if (!this.routes.has(from)) return this

    // Rename path
    const Route = this.routes.get(from)
    this.routes.set(to, Route)
    this.routes.delete(from)

    return this
  }

  // Inject 404 page.
  inject404 () {
    // Append 404 route(to last).
    this.routes.set('*', this.route404)
    return this
  }

  toArray () {
    return _.map(Array.from(this.routes.entries()), ([path, route]) => {
      const mergedRoute = {
        ...route,
        path // Override path by key.
      }
      return [path, mergedRoute]
    })
  }

  toJSON () {
    return this.toArray()
  }
}

// Parse routes.json and create Loadable components.
export default () => {
  // Remove cached json while development.
  if (dev) {
    delete require.cache[require.resolve('@app/routes.json')]
  }

  // Retrieve latest routes.json.
  const routesJson = require('@app/routes.json')

  const routes = _.transform(routesJson, (result, module) => {
    const Route = loadable(async () => wrapLoadable(await import(`@app/src/routes/${module}`)), { render: renderLoadable })

    let path = `/${_.toLower(module)}`

    let route = {
      path,
      exact: true,
      module: `src/routes/${module}.js`,
      Component: setDisplayName(module)(Route)
    }

    if (path === '/404') {
      path = '*'
      route['exact'] = false
    } else if (path === '/index') {
      path = '/'
    }

    // Construct react-router route-like object.
    result[path] = {
      ...route,
      path
    }
  }, {})

  return new Routes(routes)
}