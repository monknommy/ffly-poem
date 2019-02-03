import ApolloClient from "apollo-boost";
import React, { Component } from 'react';
import gql from "graphql-tag";
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT 
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
      <Router>
        <div>
          <Route path="/poem/:id" component={Poem} />
          <Route path="/author/:id" component={Author} />
          <Route exact path="/" component={Home} />
          </div>
      </Router>
    );
  }
}

function Home() {
  return (
    <div>
      <h3>Home</h3>
    </div>
  );
}


function Poem({ match }) {
  return (
    <div>
      <h3>Poem ID: {match.params.id}</h3>
    </div>
  );
}

function Author({ match }) {
  return (
    <div>
      <h3>Author ID: {match.params.id}</h3>
    </div>
  );
}
export default App;
