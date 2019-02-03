# Firefly Poem
A chinese poem app.

## Goal
Explore technical architecture that bootstrap startup by leveraging techology like Serverless, AWS Lambda, AWS Dynamodb, Apollo GraphQL, Docker, React.

## Setup
### AWS Account: 
Apply a free AWS account.

### Setup AWS Credentials for serverless:
https://serverless.com/framework/docs/providers/aws/guide/credentials/

### Development Environment:

ffly-poem/development/README.md

### Database:
ffly-poem/backend/dynamodb/README.md

### Lambda GraphQL Endpoint:
ffly-poem/backend/graphql/README.md

### Local Express GraphQL Endpoint:
ffly-poem/backend/local-server/README.md

### React Web Client:
ffly-poem/clients/web/README.md

## Config
inspired by [The Twelve Factors](https://12factor.net/), environment variable is used for product wide config. fffly-poem/fconfig.env is loaded to Docker container automatically.