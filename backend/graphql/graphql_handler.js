'use strict'; 

const { ApolloServer, gql } = require('apollo-server-lambda');
const { schema } = require('./schema');
const { resolvers } = require('./resolvers');
const aws_sdk = require("aws-sdk");

aws_sdk.config.update({region: process.env.AWS_DEFAULT_REGION});

const server = new ApolloServer({ 
  typeDefs: schema, 
  resolvers: resolvers,  
  context: {aws_sdk: aws_sdk},
  playground: {
    endpoint: process.env.GRAPHQL_PLAYGROUND_ENDPOINT,
  }
});

exports.handler = server.createHandler(
  {
    cors: {
      origin: '*',
      credentials: true,
    },
  }
);