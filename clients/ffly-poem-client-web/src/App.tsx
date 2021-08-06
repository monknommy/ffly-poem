import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import ApolloClient from "apollo-boost";
import CssBaseline from "@material-ui/core/CssBaseline";
import PoemContainer from "./components/PoemContainer";
import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
   cache: new InMemoryCache()
});

  function App() {
    return (
      <div>
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
      </div>
    );
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
