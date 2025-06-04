export TF_VAR_bastion_image_id=$(aws ssm get-parameters --name "testParam" | jq -r '.Parameters[].Value' || echo "")


aws ssm put-parameter --name "COGNITO_USER_POOL_ID" --value $COGNITO_USER_POOL_ID --type String
aws ssm put-parameter --name "COGNITO_USER_POOL_CLIENT_ID" --value $COGNITO_USER_POOL_CLIENT_ID --type String
aws ssm put-parameter --name "COGNITO_IDENTITY_POOL_ID" --value $COGNITO_IDENTITY_POOL_ID --type String