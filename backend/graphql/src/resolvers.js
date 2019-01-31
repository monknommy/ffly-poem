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
    console.log(item);
    if (item.id2 === 'SELF') { // a node
      for (var key in item) {
        node[key] = item[key]
      }
    } else {
      const relation = item.id2.split(':')[0]
      const neighbor_id = item.id2.split(':')[1];
      console.log(node);
      node.edges[relation] = {
        id: neighbor_id
      }
      for (var key in item.id2_data) {
        node.edges[relation][key] = item.id2_data[key]
      }
    }
  }
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

//  const data = await context.dynamodb.query(params).promise();
  const data = await queryNodeByID(context.dynamodb, poem_id);
  console.log('here is finaial');
  console.log(data);

  return data;
}

function resolveAuthorInPoem(parent, args, context, info) {
  const data = parent.edges['AUTHOR'];
  return data; //todo shawn what should happen when querying other fields?
}

exports.resolvers = {
  Query: {
    poem: (parent, args, context, info) => resolvePoemInQuery(parent, args, context, info),
  },

  Poem: {
    author: (parent, args, context, info) => resolveAuthorInPoem(parent, args, context, info),
  },
};