import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import PoemContainer from "./components/PoemContainer";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/poem/:id" component={PoemContainer} />
            {/* <Route path="/author/:id" component={Author} /> */}
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

function Home() {
  return (
    <div>
      <h3>Firefly Poem, TBD</h3>
    </div>
  );
}

// type AuthorProps = {
//   match: match<{ id: string }>
// }
// function Author({ match }: AuthorProps) {
//   return (
//     <div>
//       <h3>Author ID: {match.params.id}</h3>
//     </div>
//   );
// }
export default App;
