'use strict'; 
// Todo shawn, use ES6 format. install babel?

const { ApolloServer, gql } = require('apollo-server-lambda');
const { schema } = require('./schema');
const { resolvers } = require('./resolvers');

const server = new ApolloServer({ 
  typeDefs: schema, 
  resolvers: resolvers,  
  playground: {
    endpoint: '/dev/graphql', // todo shawn figure out how to set stage.
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