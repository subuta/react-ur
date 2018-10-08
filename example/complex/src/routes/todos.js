import React from 'react'
import { Helmet } from 'react-helmet'
import { hot } from 'react-hot-loader'
import _ from 'lodash'

import gql from 'graphql-tag'
import graphQLClient from '../utils/graphQLClient'

const Todos = ({ todoes = [] }) => {
  return (
    <>
      <Helmet>
        <title>Todos | react-ur example</title>
      </Helmet>

      <h1>Todos</h1>

      <ul>
        {_.map(todoes, (todo) => {
          return (
            <li key={todo.id}>{todo.title} - isDone={String(todo.isDone)}</li>
          )
        })}
      </ul>
    </>
  )
}

Todos.getInitialProps = async () => {
  const query = gql`
    query {
      todoes {
        id
        title
        isDone
      }
    }
  `

  const { todoes } = await graphQLClient.request(query)

  return {
    todoes
  }
}

export default hot(module)(Todos)