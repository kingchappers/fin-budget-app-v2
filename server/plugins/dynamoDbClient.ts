import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export async function connectDynamoDb(authorizationHeader: string | null) {
    const region = "eu-west-2"
    const identityPoolId = "eu-west-2:7f32016b-3dc6-4c2e-86ae-9697a90e2fb7"

    const id = authorizationHeader || ''

    const dynamoClient = new DynamoDBClient({
        region: region,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: region }),
            identityPoolId: identityPoolId,
            logins: {
                'cognito-idp.eu-west-2.amazonaws.com/eu-west-2_J6kM16ZTK': id
            },
        })
    })

    return dynamoClient;
}

export default connectDynamoDb;
