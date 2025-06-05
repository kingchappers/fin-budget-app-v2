#!/bin/bash
userPoolId=$(aws ssm get-parameter --name /amplify/fin-budget/prod/COGNITO_USER_POOL_ID | jq '.Parameter.Value')
userPoolClientId=$(aws ssm get-parameter --name /amplify/fin-budget/prod/COGNITO_USER_POOL_CLIENT_ID | jq '.Parameter.Value')
identityPoolId=$(aws ssm get-parameter --name /amplify/fin-budget/prod/COGNITO_IDENTITY_POOL_ID | jq '.Parameter.Value')