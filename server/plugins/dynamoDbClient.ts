import { Nitro } from "nitropack";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export async function connectDynamoDb() {
    const region = "eu-west-2"
    const identityPoolId = "eu-west-2:7f32016b-3dc6-4c2e-86ae-9697a90e2fb7"



    const dynamoClient = new DynamoDBClient({
        region: region,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: region }),
            identityPoolId: identityPoolId,
            // logins: {
            //     'cognito-idb.eu-west-2.amazonaws.com/eu-west-2_J6kM16ZTK': result.getIdToken().getJwtTocken()
            // }
        })
    })

    return dynamoClient;
}

export default connectDynamoDb;

// const region = "eu-west-2"
// const identityPoolId = "eu-west-2_J6kM16ZTK"

// const dynamoClient = new DynamoDBClient({
//     region: region,
//     credentials: fromCognitoIdentityPool({
//         client: new CognitoIdentityClient({ region: region }),
//         identityPoolId: identityPoolId,
//     }),
// });

// export default dynamoClient;





// export async function connectDB(_nitroApp: Nitro){
//     const config = useRuntimeConfig();

//   try {
//     await mongoose.connect(config.mongodbUri);
//     console.log('MongoDB connected successfully!');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// };

// export default connectDB;
