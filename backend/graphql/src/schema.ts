import { gql } from 'apollo-server-lambda';

export const schema = gql`
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