/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PoemQuery
// ====================================================

export interface PoemQuery_poem_author {
  __typename: "Author";
  name: string | null;
}

export interface PoemQuery_poem {
  __typename: "Poem";
  id: string;
  annotation: string | null;
  name: string | null;
  content: string;
  author: PoemQuery_poem_author | null;
}

export interface PoemQuery {
  poem: PoemQuery_poem | null;
}

export interface PoemQueryVariables {
  id: string;
}
