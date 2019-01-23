'use strict'; 


async function resolvePoemInQuery(parent, args, context, info) {
  //todo shawn check is this really poem id?
  const params = {
    TableName: process.env.AWS_DYNAMODB_META_TABLE, // Todo shawn put this table in ffconfig.
    Key: {
        id: args.id,
        id2: args.id,
      }
  };

const data = await context.dynamodb.get(params).promise();
//todo shawn a better logger??
console.log(data.Item);
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