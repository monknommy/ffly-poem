"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_lambda_1 = require("apollo-server-lambda");
exports.schema = apollo_server_lambda_1.gql `
type Query {
    poem(id: String!): Poem
}

type Poem {
    id: String!
    content: String!
    name: String
    genre: String
    annotation: String
    author: Author
}

type Author {
    id: String!
    name: String
    dynasty: String
    about: String
}
`;
