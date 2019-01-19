const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { schema } = require('/ffly-poem/backend/graphql/schema');
const { resolvers } = require('/ffly-poem/backend/graphql/resolvers');
//const { resolvers } = require('./resolvers');

const server = new ApolloServer({ 
    typeDefs: schema,
    resolvers: resolvers,
});

const app = express();
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () =>
  console.log(`🚀 GraphQL ready at http://localhost:${port}${server.graphqlPath}`),
);