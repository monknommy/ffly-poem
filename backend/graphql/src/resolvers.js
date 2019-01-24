'use strict';

async function resolvePoemInQuery(parent, args, context, info) {
  const poem_id = args.id;
  if (!poem_id.startsWith('POEM')) {
    return null;
  }

  const params = {
    TableName: process.env.AWS_DYNAMODB_META_TABLE,
    Key: {
      id: poem_id,
      id2: poem_id,
    }
  };

  const data = await context.dynamodb.get(params).promise();
  return data.Item;
}

function resolveAuthorInPoem(parent, args, context, info) {
  return null;
}

exports.resolvers = {
  Query: {
    poem: (parent, args, context, info) => resolvePoemInQuery(parent, args, context, info),
  },

  Poem: {
    author: (parent, args, context, info) => resolveAuthorInPoem(parent, args, context, info),
  },
};