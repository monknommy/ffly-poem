const { gql } = require('apollo-server-lambda');

const schema = gql`
type Query {
    poem(poem_id: String!): Poem!
}

type Poem {
    poem_id: String!
    content: String!
    name: String
    genre: String
    annotation: String
    author: Author
}

type Author {
    author_id: String!
    name: String
    dynasty: String
}
`;

exports.schema = schema;
