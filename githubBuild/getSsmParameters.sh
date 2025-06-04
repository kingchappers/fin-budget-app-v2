#!/bin/bash
aws ssm put-parameter --name "COGNITO_USER_POOL_ID" --value $COGNITO_USER_POOL_ID --type String
aws ssm put-parameter --name "COGNITO_USER_POOL_CLIENT_ID" --value $COGNITO_USER_POOL_CLIENT_ID --type String
aws ssm put-parameter --name "COGNITO_IDENTITY_POOL_ID" --value $COGNITO_IDENTITY_POOL_ID --type String