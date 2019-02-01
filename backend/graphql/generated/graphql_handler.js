'use strict';
var _a = require('apollo-server-lambda'), ApolloServer = _a.ApolloServer, gql = _a.gql;
var schema = require('./schema').schema;
var resolvers = require('./resolvers').resolvers;
var aws_sdk = require("aws-sdk");
aws_sdk.config.update({ region: process.env.FFLY_AWS_REGION });
var server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,
    context: function () { return ({
        dynamodb: new aws_sdk.DynamoDB.DocumentClient()
    }); },
    playground: {
        endpoint: process.env.GRAPHQL_PLAYGROUND_ENDPOINT
    }
});
exports.handler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true
    }
});
