import React from 'react'

export default (props) => {
  const {
    main,
    htmlAttributes,
    head,
    bodyAttributes,
    body
  } = props

  return (
    <html {...htmlAttributes}>
      <head>
        <title>react-ur example</title>

        {head}
      </head>
      <body {...bodyAttributes}>
        {main}

        {body}
        <script src='/main.bundle.js' />
      </body>
    </html>
  )
}
