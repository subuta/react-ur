import React from 'react'
import { hot } from 'react-hot-loader'
import { Helmet } from 'react-helmet'

import { timeout, TimeoutError } from 'promise-timeout'
import _ from 'lodash'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'

const Baz = (props) => {
  const {
    jokes = []
  } = props

  return (
    <>
      <Helmet>
        <title>Baz | react-ur example</title>
      </Helmet>

      <Header />

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
  const jokes = await timeout(fetch('http://api.icndb.com/jokes/random/3'), 1000)
    .then(res => res.json())
    .then(json => _.get(json, 'value', []))
    .catch(err => {
      if (err instanceof TimeoutError) {
        return [{id: 1, joke: 'icndb not responding within 1s :('}]
      }
      return []
    })

  return {
    jokes
  }
}

export default hot(module)(Baz)