import React from 'react'
import { Helmet } from 'react-helmet'
import _ from 'lodash'
import fetch from 'isomorphic-unfetch'

import { hot } from 'react-hot-loader'

const Baz = (props) => {
  const {
    jokes = []
  } = props

  return (
    <>
      <Helmet>
        <title>Baz | react-ur example</title>
      </Helmet>

      <h1>Baz</h1>

      <ul>
        {_.map(jokes, ({ id, joke }) => (
          <li key={id}>{joke}</li>
        ))}
      </ul>
    </>
  )
}

Baz.getInitialProps = async () => {
  console.log('Retrieving jokes from icndb for you...')
  const jokes = await fetch('http://api.icndb.com/jokes/random/3')
    .then(res => res.json())
    .then(json => _.get(json, 'value', []))

  return {
    jokes
  }
}

export default hot(module)(Baz)