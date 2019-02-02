'use strict';

import { DynamoDB } from "aws-sdk";

type DocumentClient = DynamoDB.DocumentClient;
type FFID = string;

interface FFNode {
  [property: string]: any
  edges: {
    [relationship: string]: [FFID] | undefined // Either not existed or an array with FFID inside.
  }
}

interface GraphQLContext {
  dbClient: DocumentClient
}

function ffid(id: string): FFID {
  const [nodeType, nodeID] = id.split('_');
  if (!nodeType || !nodeID) {
    throw ("Invalid FFID {id}");
  }
  //todo shawn, list all supported node type in a const and check againest it.
  return id;
}

function getEnvEnforce(key: string): string {
  const result = process.env[key];
  if (!result) {
    throw ("Environment Variable ${key} Does not Existed!");
  }
  return result;
}

async function queryNodeByID(dbClient: DocumentClient, id: string): Promise<FFNode | null> {
  const params = {
    TableName: getEnvEnforce('AWS_DYNAMODB_META_TABLE'),
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': id,
    }
  };

  const data = await dbClient.query(params).promise();
  const node: FFNode = {
    edges: {}
  }

  if (!data.Items) {
    return null;
  }

  data.Items.forEach(item => {
    if (!item.edge) {
      throw ('No edge existed in item');
    }
    if (item.edge === 'SELF') { // a node
      for (var key in item) {
        node[key] = item[key]
      }
    } else {
      const [relation, neighbor_id] = item.edge.split(':');
      if (!relation || !neighbor_id) {
        throw ('{item.edge} is not a valid edge, expect splitable by :');
      }
      node.edges[relation] = [ffid(neighbor_id)];
    }
  });

  console.log('shawnxx requested node ', node);
  return node;
}

async function resolvePoemInQuery(_parent: any, args: {id: FFID}, context: GraphQLContext, _info: any) {
  const poem_id = args.id;
  if (!poem_id.startsWith('POEM')) { // todo shawn a FFNodeUtil to check node type.
    return null;
  }

  const data = await queryNodeByID(context.dbClient, poem_id);
  return data;
}

async function resolveAuthorInPoem(parent: FFNode, _args: any, context: GraphQLContext, _info: any) {
  const data = parent.edges['AUTHOR'];
  if (!data) {
    return null;
  }
  const author_id = data[0];
  return await queryNodeByID(context.dbClient, author_id);
}

export const resolvers = {
  Query: {
    poem: (parent: any, args: any, context: GraphQLContext, info: any) => resolvePoemInQuery(parent, args, context, info),
  },

  Poem: {
    author: (parent: any, args: any, context: GraphQLContext, info: any) => resolveAuthorInPoem(parent, args, context, info),
  },
};