import React from 'react';
import './Poem.css';

type Props = { // TODO Shawn use apollo to gen the type.
  id: string
  annotation: string | null
  name: string | null
  content: string | null
}
class Poem extends React.Component<Props> {
  render() {
    return (
      <div className='Poem'>
       <div>{this.props.name}</div>
       <div>{this.props.content}</div>
      </div>
    );
  }
}

export default Poem;