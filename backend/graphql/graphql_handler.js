'use strict'; 

const { ApolloServer, gql } = require('apollo-server-lambda');
const { schema } = require('./schema');
const { resolvers } = require('./resolvers');

const stage = process.env.STAGE;
let endpoint = '/graphql';
if (stage == 'dev') {
  endpoint = '/dev/graphql';
}
const server = new ApolloServer({ 
  typeDefs: schema, 
  resolvers: resolvers,  
  playground: {
    endpoint: endpoint,
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