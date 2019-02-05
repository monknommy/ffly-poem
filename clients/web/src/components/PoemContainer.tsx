import React from 'react';
import { match } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";

type Props = {
  match: match<{ id: string }>
}

const query = gql`
  query Poem($id: String!) {
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
      <div>
        <h3>Poem ID: {this.props.match.params.id}</h3>

        <Query
          query={query}
          variables={ {id: this.props.match.params.id} }
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            console.log(data);
            return <div> success </div>
          }}
        </Query>
      </div>
    );
  }
}

export default PoemContainer;