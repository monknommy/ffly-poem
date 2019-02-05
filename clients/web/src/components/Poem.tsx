import React from 'react';

type Props = { // TODO Shawn use apollo to gen the type.
  id: string
  annotation: string
  name: string
  content: string
}
class Poem extends React.Component<Props> {
  render() {
    return (
      // <div>{this.props.name}</div>
      // <div>{this.props.name<}/div>
    );
  }
}

export default Poem;