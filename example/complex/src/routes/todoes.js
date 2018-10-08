import React from 'react'
import { Helmet } from 'react-helmet'
import { hot } from 'react-hot-loader'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import {
  fetchTodoes
} from '../utils/api'

import Todo from '../components/Todo'

const Todoes = ({ todoes = [] }) => {
  return (
    <>
      <Helmet>
        <title>Todos | react-ur example</title>
      </Helmet>

      <h1>Todos</h1>

      <ul>
        {_.map(todoes, (todo) => {
          return (
            <Todo key={todo.id} todo={todo} />
          )
        })}
      </ul>

      <Link to="/todo/new">Create new todo</Link>
    </>
  )
}

Todoes.getInitialProps = async () => {
  const todoes = await fetchTodoes()
  return {
    todoes
  }
}

export default hot(module)(Todoes)