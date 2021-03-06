const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { schema } = require('/ffly-poem/backend/graphql/build/schema');
const { resolvers } = require('/ffly-poem/backend/graphql/build/resolvers');
const aws_sdk = require("aws-sdk");

console.log('FFLOG: aws config', process.env.FFLY_AWS_REGION);
aws_sdk.config.update({region: process.env.FFLY_AWS_REGION});

const server = new ApolloServer({ 
    typeDefs: schema,
    resolvers: resolvers,
    context: () => ({
      dbClient: new aws_sdk.DynamoDB.DocumentClient()
    }),
});

const app = express();
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () =>
  console.log(`🚀 GraphQL ready at http://localhost:${port}${server.graphqlPath}`),
);