import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

import './App.css';

const client = new ApolloClient({
  uri: "https://0zjolgg184.execute-api.us-west-1.amazonaws.com/dev/graphql"
});

client
  .query({
    query: gql`
    {
      poem(poem_id: "111") {
        poem_id
      }
    }
    `
  })
  .then(result => console.log(result));

class App extends Component {
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
