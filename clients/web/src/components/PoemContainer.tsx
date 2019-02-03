import React from 'react';
import { match } from "react-router-dom";

type Props = {
  match: match<{ id: string }>
}


class PoemContainer extends React.Component<Props> {
  render() {
    return (
      <div>
        <h3>Poem ID: {this.props.match.params.id}</h3>
      </div>
    );
  }
}

export default PoemContainer;