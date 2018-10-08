import React from 'react'
import { Helmet } from 'react-helmet'
import { hot } from 'react-hot-loader'
import { Link } from 'react-router-dom'

import Boom from 'boom'
import _ from 'lodash'

import {
  compose,
  branch,
  renderComponent,
  withHandlers,
  withState,
  withStateHandlers
} from 'recompose'

import {
  deleteTodo,
  fetchTodo,
  upsertTodo
} from '../utils/api'

const enhance = compose(
  hot(module),
  branch(
    ({ todo }) => !todo,
    renderComponent(() => null),
    _.identity
  ),
  withState('isProgress', 'setIsProgress', false),
  // Form handlers.
  withStateHandlers(
    // Initial State of form.
    ({ todo = {} }) => ({
      id: todo.id,
      title: todo.title || '',
      isDone: todo.isDone || false,
      dueDate: todo.dueDate || null
    }),
    {
      toggleIsDone: () => (e) => {
        return { isDone: e.target.checked }
      },

      setTitle: () => (e) => {
        return { title: e.target.value }
      },

      setDueDate: () => (e) => {
        e.preventDefault()
        return { dueDate: e.target.value }
      }
    }
  ),
  withHandlers({
    onSubmit: (props) => async () => {
      const {
        id,
        title,
        isDone,
        dueDate,
        isProgress,
        setIsProgress
      } = props

      // Skip while request is progress.
      if (isProgress) return

      setIsProgress(true)

      const todo = await upsertTodo(id, { title, isDone, dueDate: dueDate ? dueDate : null })

      setIsProgress(false)

      console.log('Upserted todo = ', todo)
    },

    onDelete: (props) => async () => {
      const {
        id,
        isProgress,
        setIsProgress
      } = props

      // Skip while request is progress.
      if (isProgress) return

      setIsProgress(true)

      const todo = await deleteTodo(id)

      setIsProgress(false)

      console.log('Deleted todo = ', todo)

      // Force redirect to /todoes after deletion.
      location.href = '/'
    }
  })
)

const Todo = enhance((props) => {
  const {
    id,
    title,
    isDone,
    dueDate,
    setTitle,
    setDueDate,
    toggleIsDone,
    isProgress,
    onSubmit,
    onDelete
  } = props

  const pageTitle = `${id === 'new' ? 'Create' : 'Edit'} Todo`

  return (
    <>
      <Helmet>
        <title>{pageTitle} | react-ur example</title>
      </Helmet>

      <h1>{pageTitle}</h1>

      <div>
        <label style={{ display: 'block', margin: '0 0 8px 0' }}>
          <span>Title: </span>
          <input
            onChange={setTitle}
            value={title}
          />
        </label>

        <label style={{ display: 'block', margin: '0 0 8px 0' }}>
          <span>isDone?: </span>
          <input type="checkbox"
                 checked={isDone}
                 onChange={toggleIsDone}
          />
        </label>

        <label style={{ display: 'block', margin: '0 0 8px 0' }}>
          <span>dueDate: </span>
          <input type="date"
                 value={dueDate ? new Date(dueDate).toISOString().substring(0, 10) : ''}
                 onChange={setDueDate}
          />
        </label>

        <div style={{ margin: '16px 0' }}>
          <button
            onClick={onSubmit}
          >
            {isProgress ? 'saving...' : 'save'}
          </button>

          <button
            onClick={onDelete}
          >
            {isProgress ? 'deleting...' : 'delete'}
          </button>
        </div>
      </div>

      <Link to="/">{'<-'} Go back to todos.</Link>
    </>
  )
})

Todo.getInitialProps = async ({ match }) => {
  const id = _.get(match, 'params.id')

  if (id === 'new') {
    return {
      todo: { id: 'new' }
    }
  }

  const todo = await fetchTodo(id)

  if (!todo) {
    throw Boom.notFound()
  }

  return {
    todo
  }
}

export default Todo