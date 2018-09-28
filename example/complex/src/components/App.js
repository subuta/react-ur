import React from 'react'

import { Routes } from 'react-ur'

export default () => {
  return (
    <Routes configure={(pages) => {
      return pages
        .rename('/todos', '/')
        .rename('/todo', '/todo/:id')
        .inject404()
    }} />
  )
}
