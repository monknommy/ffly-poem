'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_lambda_1 = require("apollo-server-lambda");
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
const aws_sdk_1 = require("aws-sdk");
aws_sdk_1.config.update({ region: process.env.FFLY_AWS_REGION });
const server = new apollo_server_lambda_1.ApolloServer({
    typeDefs: schema_1.schema,
    resolvers: resolvers_1.resolvers,
    context: () => ({
        dbClient: new aws_sdk_1.DynamoDB.DocumentClient()
    }),
    playground: {
        endpoint: process.env.GRAPHQL_PLAYGROUND_ENDPOINT,
    }
});
exports.handler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
    },
});
