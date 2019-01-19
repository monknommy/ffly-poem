const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { schema } = require('/ffly-poem/backend/graphql/schema');
const { resolvers } = require('/ffly-poem/backend/graphql/resolvers');
const aws_sdk = require("aws-sdk");

console.log('shawnxx aws config', process.env.AWS_DEFAULT_REGION);
aws_sdk.config.update({region: process.env.AWS_DEFAULT_REGION});

const server = new ApolloServer({ 
    typeDefs: schema,
    resolvers: resolvers,
    context: {aws_sdk: aws_sdk},
});

const app = express();
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () =>
  console.log(`🚀 GraphQL ready at http://localhost:${port}${server.graphqlPath}`),
);