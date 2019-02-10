import './App.css';
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import CssBaseline from "@material-ui/core/CssBaseline";
import PoemContainer from "./components/PoemContainer";
import React, { Component } from 'react';
import Toolbar from "@material-ui/core/Toolbar";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
});

class App extends Component {
  render() {
    return (
      <>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route path="/" component={Home} />
            <Route path="/poem/:id" component={PoemContainer} />
            {/* <Route path="/author/:id" component={Author} /> */}
          </div>
        </Router>
      </ApolloProvider>
      </>
    );
  }
}

function Home() {
  return (
    <div>
      <Toolbar />
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
