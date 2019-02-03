# Lambda GraphQL
The graphql layer that handles requests from all clients. It lives in AWS Lambda.

## Setup
Populate node_modules:
```
npm install
```
Build:
``` 
tsc
```
Deploy to AWS:
```
serverless deploy
```

## GraphQL Playground
This server has graphql playground build in. Once deployed, you should able to access it through the GET endpoint.