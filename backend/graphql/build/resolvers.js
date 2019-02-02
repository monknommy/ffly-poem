'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function ffid(id) {
    const [nodeType, nodeID] = id.split('_');
    if (!nodeType || !nodeID) {
        throw ("Invalid FFID {id}");
    }
    //todo shawn, list all supported node type in a const and check againest it.
    return id;
}
function getEnvEnforce(key) {
    const result = process.env[key];
    if (!result) {
        throw ("Environment Variable ${key} Does not Existed!");
    }
    return result;
}
async function queryNodeByID(dbClient, id) {
    const params = {
        TableName: getEnvEnforce('AWS_DYNAMODB_META_TABLE'),
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
            ':id': id,
        }
    };
    const data = await dbClient.query(params).promise();
    const node = {
        edges: {}
    };
    if (!data.Items) {
        return null;
    }
    data.Items.forEach(item => {
        if (!item.edge) {
            throw ('No edge existed in item');
        }
        if (item.edge === 'SELF') { // a node
            for (var key in item) {
                node[key] = item[key];
            }
        }
        else {
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
async function resolvePoemInQuery(_parent, args, context, _info) {
    const poem_id = args.id;
    if (!poem_id.startsWith('POEM')) { // todo shawn a FFNodeUtil to check node type.
        return null;
    }
    const data = await queryNodeByID(context.dbClient, poem_id);
    return data;
}
async function resolveAuthorInPoem(parent, _args, context, _info) {
    const data = parent.edges['AUTHOR'];
    if (!data) {
        return null;
    }
    const author_id = data[0];
    return await queryNodeByID(context.dbClient, author_id);
}
exports.resolvers = {
    Query: {
        poem: (parent, args, context, info) => resolvePoemInQuery(parent, args, context, info),
    },
    Poem: {
        author: (parent, args, context, info) => resolveAuthorInPoem(parent, args, context, info),
    },
};
