import React from 'react'
import { ApolloServer } from 'apollo-server-koa'

import prismaBinding from './prisma-binding'
import { prisma } from './schema/generated/prisma-client'
import schema from './schema'

const server = new ApolloServer({
  schema,
  context: {
    binding: prismaBinding,
    db: prisma
  }
})

export default (app) => {
  server.applyMiddleware({ app })
}

