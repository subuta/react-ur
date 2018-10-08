import React from 'react'
import { Helmet } from 'react-helmet'
import { hot } from 'react-hot-loader'

import Boom from 'boom'
import _ from 'lodash'
import gql from 'graphql-tag'

import graphQLClient from '../utils/graphQLClient'

const Todo = ({ todo = {} }) => {
  return (
    <>
      <Helmet>
        <title>Todo | react-ur example</title>
      </Helmet>

      <h1>Todo</h1>

      <span>{todo.title}</span><br />
      <span>{String(todo.isDone)}</span>
    </>
  )
}

Todo.getInitialProps = async ({ match }) => {
  const query = gql`
    query getTodo($id: ID!) {
      todo(where: {
        id: $id
      }) {
        id
        title
        isDone
      }
    }
  `

  const id = _.get(match, 'params.id')

  const { todo } = await graphQLClient.request(query, { id })

  if (!todo) {
    throw Boom.notFound()
  }

  return {
    todo
  }
}

export default hot(module)(Todo)