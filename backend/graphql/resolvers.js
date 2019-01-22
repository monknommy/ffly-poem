'use strict'; 

async function queryPoem(poem_id, aws_sdk) {
  const docClient = new aws_sdk.DynamoDB.DocumentClient();
  const params = {
      TableName: 'dev-ffly-poem-meta', // Todo shawn put this table in ffconfig.
      Key: {
          id1: poem_id,
          id2: poem_id,
        }
  };

  const data = await docClient.get(params).promise();
//data && data.Item && data.Item.payload
    data.Item.poem_id = data.Item.id1;
  console.log(data.Item);
  return data.Item;
}

async function resolvePoemInQuery(parent, args, context, info) {
    const poem_id = args.poem_id;
    const poem = {
        poem_id: poem_id,
        content: "this is content",
        id2: "author_haha",
        id2_data: "data",
    }
return await queryPoem(poem_id, context.aws_sdk);
    //return poem;
}

function resolveAuthorInPoem(parent, args, context, info) {
    const author = {
        author_id: parent.id2,
        name: parent.id2_data,
    };
    return author;
}

exports.resolvers = {
    Query: {
        poem: (parent, args, context, info) => resolvePoemInQuery(parent, args, context, info),
    },

    Poem: {
        author: (parent, args, context, info) => resolveAuthorInPoem(parent, args, context, info),
    },
  };