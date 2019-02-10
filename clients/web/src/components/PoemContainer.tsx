import React from 'react';
import { match } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Poem from "./Poem";
import { PoemQuery, PoemQueryVariables } from "./__generated__/PoemQuery";

type Props = {
  match: match<{ id: string }>
}

const query = gql`
  query PoemQuery($id: String!) {
    poem(id: $id) {
      id,
      annotation,
      name,
      content,
    }
  }  
`
class PoemContainer extends React.Component<Props> {
  render() {
    return (
      <Query<PoemQuery, PoemQueryVariables>
        query={query}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error || !data) return <p>Error :(</p>;
          return <Poem {data.poem} />
        }}
      </Query>
    );
  }
}

export default PoemContainer;