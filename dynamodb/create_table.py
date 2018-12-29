'''
This script require credentials with dynamo db write access(suggest AmazonDynamoDBFullAccess).
More about boto3 credentials: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/quickstart.html#configuration
credentials goes to ffly-poem/.aws
'''
import boto3

client = boto3.client('dynamodb')

response = client.create_table(
    TableName='test_ffly_poem',
    AttributeDefinitions=[
        {
            'AttributeName': 'id1',
            'AttributeType': 'S',
        },
        {
            'AttributeName': 'id2',
            'AttributeType': 'S',
        }
    ],
    KeySchema=[
        {
            'AttributeName': 'id1',
            'KeyType': 'HASH',
        },
        {
            'AttributeName': 'id2',
            'KeyType': 'RANGE',
        },
    ],
    GlobalSecondaryIndexes=[
        {
            'IndexName': 'reverse_edge',
            'KeySchema': [
                {
                    'AttributeName': 'id2',
                    'KeyType': 'HASH',
                }
            ],
            'Projection': {
                'ProjectionType': 'INCLUDE',
                'NonKeyAttributes': [
                    'id2_data',
                ]
            },
            'ProvisionedThroughput': {
                'ReadCapacityUnits': 2,
                'WriteCapacityUnits': 1,
            }
        },
    ],
    ProvisionedThroughput={
        'ReadCapacityUnits': 2,
        'WriteCapacityUnits': 1,
    },
)



