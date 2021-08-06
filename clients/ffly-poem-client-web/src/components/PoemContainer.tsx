import React from 'react';
import {
 useQuery,
  gql
} from "@apollo/client";
import Poem from "./Poem";
import { match } from "react-router-dom";
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
      author {
        name
      }
    }
  }  
`
function PoemContainer(props : Props) {
  const { loading, error, data } = useQuery(query, {variables: {id: 'POEM_' + props.match.params.id}});
  if (loading) return <p>Loading...</p>;
if (error || !data || !data.poem) return <p>Error :(</p>;
  return <Poem poem={data.poem} />
}

export default PoemContainer;