'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function queryNodeByID(dynamodb, id) {
    return __awaiter(this, void 0, void 0, function () {
        var params, data, node, item_key, item, key, relation, neighbor_id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        TableName: process.env.AWS_DYNAMODB_META_TABLE,
                        KeyConditionExpression: 'id = :id',
                        ExpressionAttributeValues: {
                            ':id': id
                        }
                    };
                    return [4 /*yield*/, dynamodb.query(params).promise()];
                case 1:
                    data = _a.sent();
                    node = {
                        edges: {}
                    };
                    for (item_key in data.Items) { // use map maybe todo shawn
                        item = data.Items[item_key];
                        if (item.edge === 'SELF') { // a node
                            for (key in item) {
                                node[key] = item[key];
                            }
                        }
                        else {
                            relation = item.edge.split(':')[0];
                            neighbor_id = item.edge.split(':')[1];
                            // todo null check
                            node.edges[relation] = [neighbor_id];
                        }
                    }
                    console.log('shawnxx requested node ', node);
                    return [2 /*return*/, node];
            }
        });
    });
}
function resolvePoemInQuery(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function () {
        var poem_id, params, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    poem_id = args.id;
                    if (!poem_id.startsWith('POEM')) {
                        return [2 /*return*/, null];
                    }
                    params = {
                        TableName: process.env.AWS_DYNAMODB_META_TABLE,
                        KeyConditionExpression: 'id = :poem_id',
                        ExpressionAttributeValues: {
                            ':poem_id': poem_id
                        }
                    };
                    return [4 /*yield*/, queryNodeByID(context.dynamodb, poem_id)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
function resolveAuthorInPoem(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function () {
        var data, author_id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = parent.edges['AUTHOR'];
                    author_id = data[0];
                    return [4 /*yield*/, queryNodeByID(context.dynamodb, author_id)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.resolvers = {
    Query: {
        poem: function (parent, args, context, info) { return resolvePoemInQuery(parent, args, context, info); }
    },
    Poem: {
        author: function (parent, args, context, info) { return resolveAuthorInPoem(parent, args, context, info); }
    }
};
