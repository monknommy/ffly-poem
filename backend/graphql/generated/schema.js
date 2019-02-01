var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var gql = require('apollo-server-lambda').gql;
var schema = gql(__makeTemplateObject(["\ntype Query {\n    poem(id: String!): Poem\n}\n\ntype Poem {\n    id: String!\n    content: String!\n    name: String\n    genre: String\n    annotation: String\n    author: Author\n}\n\ntype Author {\n    id: String!\n    name: String\n    dynasty: String\n    about: String\n}\n"], ["\ntype Query {\n    poem(id: String!): Poem\n}\n\ntype Poem {\n    id: String!\n    content: String!\n    name: String\n    genre: String\n    annotation: String\n    author: Author\n}\n\ntype Author {\n    id: String!\n    name: String\n    dynasty: String\n    about: String\n}\n"]));
exports.schema = schema;
