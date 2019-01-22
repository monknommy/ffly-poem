keep your aws credentials here. This folder will get mapped to ~/.aws in docker.

Your credientials file should have a profile named serverless.

/ffly-poem/.aws/credientials
```
[serverless]
aws_access_key_id = YOUR_AWS_KEY_ID
aws_secret_access_key = YOUR_AWS_KEY
```

config file is not used since serverless doesn't read from it. Instead FFLY_AWS_REGION env is set for both serverless and boto3.