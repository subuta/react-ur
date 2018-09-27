import React from 'react'

import { Page } from 'react-ur'

export default (props) => {
  console.log('render custom App!')
  return (
    <Page configure={(pages) => {
      pages['/bar'] = pages['/todo']
      return pages
    }} />
  )
}
