import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import {
  connect,
  preload
} from 'react-ur'

export default connect(({ pages }) => {
  return (
    <div style={{ border: '1px solid black' }}>
      {_.map(pages, (Loadable, path) => (
        <Link
          style={{ margin: '0 8px 0 0' }}
          to={path}
          onMouseEnter={() => preload(Loadable, path)}
          key={path}
        >
          {path}
        </Link>
      ))}
      <Link to="/not-exists" style={{ margin: '0 8px 0 0' }}>Not exists</Link>
    </div>
  )
})
