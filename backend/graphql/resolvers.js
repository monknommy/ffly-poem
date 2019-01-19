'use strict'; 

const AWS = require("aws-sdk");
//AWS.config.update({region: 'us-west-2'});

function queryPoem(poem_id) {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const params = {
      TableName: 'dev-ffly-poem-meta', // Todo shawn put this table in ffconfig.
      Key: {'id1': poem_id}
  };

  const data = docClient.get(params).promise();
  //data && data.Item && data.Item.payload
  console.log(data);
}

function resolvePoemInQuery(args) {
    const poem_id = args.poem_id;
    const poem = {
        poem_id: poem_id,
        content: "this is content",
        id2: "author_haha",
        id2_data: "data",
    }
    return poem;
}

function resolveAuthorInPoem(parent) {
    const author = {
        author_id: parent.id2,
        name: parent.id2_data,
    };
    return author;
}

exports.resolvers = {
    Query: {
        poem: (parent, args, context, info) => resolvePoemInQuery(args),
    },

    Poem: {
        author: (parent, args, context, info) => resolveAuthorInPoem(parent),
    },
  };