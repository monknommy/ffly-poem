const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { schema } = require('/ffly-poem/serverless/schema');
const { resolvers } = require('/ffly-poem/serverless/resolvers');

const server = new ApolloServer({ 
    typeDefs: schema,
    resolvers: resolvers,
});

const app = express();
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);