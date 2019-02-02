'use strict';

import { ApolloServer } from 'apollo-server-lambda';
import { schema } from './schema';
import { resolvers } from './resolvers';
import {config as aws_config, DynamoDB} from "aws-sdk";

aws_config.update({ region: process.env.FFLY_AWS_REGION });

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  context: () => ({
    dbClient: new DynamoDB.DocumentClient()
  }),
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