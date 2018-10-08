import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import {
  withContext
} from 'react-ur'

export default withContext(({ routes }) => {
  return (
    <div style={{ border: '1px solid black' }}>
      {_.map(routes.toJSON(), ([path]) => {
        // 404(*) page must be rendered without path.
        if (path === '*') {
          return null
        }
        return (
          <Link
            style={{ margin: '0 8px 0 0' }}
            to={path}
            onMouseEnter={() => routes.preload(path)}
            key={path}
          >
            {path}
          </Link>
        )
      })}
      <Link to="/not-exists" style={{ margin: '0 8px 0 0' }}>Not exists</Link>
    </div>
  )
})
