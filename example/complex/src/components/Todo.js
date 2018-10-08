import React from 'react'

export default ({ todo }) => {
  return (
    <li>
      <a href={`todo/${todo.id}`}>{todo.title} {todo.dueDate && `- until: ${new Date(todo.dueDate).toISOString().substring(0, 10)}`}</a>
    </li>
  )
}