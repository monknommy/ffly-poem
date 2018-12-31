'use strict'; // Todo shawn, use ES6 format.

const { ApolloServer, gql } = require('apollo-server-lambda');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,  
  playground: {
    endpoint: '/dev/graphql', // todo shawn figure out how to set stage.
  }
});

exports.graphql = server.createHandler(
);