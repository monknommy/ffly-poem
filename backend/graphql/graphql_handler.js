'use strict'; 

const { ApolloServer, gql } = require('apollo-server-lambda');
const { schema } = require('./schema');
const { resolvers } = require('./resolvers');

const server = new ApolloServer({ 
  typeDefs: schema, 
  resolvers: resolvers,  
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