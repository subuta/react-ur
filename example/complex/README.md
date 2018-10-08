# Complex react-ur example.
This TodoApp example includes...

- Postgres-DB and GraphQL server powered by [Prisma](https://www.prisma.io/)
- How to call GraphQL server via [graphql-request](https://github.com/prisma/graphql-request) at `getInitialProps()`.
- How to customize routes(url). SEE: `src/components/App.js`
- How to handle 404 request at Server-Side.

### Prerequisites

- Docker (tested with d4m `Version 18.06.1-ce-mac73 (26764)`)
- Node.js (tested with `v10.7.0`)

### How to develop

```
# Install global dependencies.(prisma and graphql)
npm i prisma graphql-cli -g

# Install project dependencies.
npm i

# Start DB/Prisma
docker-compose up -d

# Deploy prisma schema
npm run pdeploy

# Start server
npm run serve
```