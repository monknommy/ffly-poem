'use strict';

async function queryNodeByID(dynamodb, id) {
  const params = {
    TableName: process.env.AWS_DYNAMODB_META_TABLE,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': id,
    }
  };

  const data = await dynamodb.query(params).promise();
  const node = {
    edges: {}
  }
  for (var item_key in data.Items) { // use map maybe todo shawn
    const item = data.Items[item_key];
    if (item.edge === 'SELF') { // a node
      for (var key in item) {
        node[key] = item[key]
      }
    } else {
      const relation = item.edge.split(':')[0]
      const neighbor_id = item.edge.split(':')[1];
      // todo null check
      node.edges[relation] = [neighbor_id];
    }
  }

  console.log('shawnxx requested node ', node);
  return node;
}

async function resolvePoemInQuery(parent, args, context, info) {
  const poem_id = args.id;
  if (!poem_id.startsWith('POEM')) {
    return null;
  }

  const params = {
    TableName: process.env.AWS_DYNAMODB_META_TABLE,
    KeyConditionExpression: 'id = :poem_id',
    ExpressionAttributeValues: {
      ':poem_id': poem_id,
    }
  };
  const data = await queryNodeByID(context.dynamodb, poem_id);
  return data;
}

async function resolveAuthorInPoem(parent, args, context, info) {
  const data = parent.edges['AUTHOR'];
  // todo null check
  const author_id = data[0];
  return await queryNodeByID(context.dynamodb, author_id);
}

exports.resolvers = {
  Query: {
    poem: (parent, args, context, info) => resolvePoemInQuery(parent, args, context, info),
  },

  Poem: {
    author: (parent, args, context, info) => resolveAuthorInPoem(parent, args, context, info),
  },
};