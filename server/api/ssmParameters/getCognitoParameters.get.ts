// server/api/cognito-config.js
// server/api/cognito-config.ts
import { SSMClient, GetParametersCommand } from "@aws-sdk/client-ssm"

interface CognitoConfig {
  userPoolId?: string
  clientId?: string
}

export default defineEventHandler(async (event): Promise<CognitoConfig> => {
  try {
    const ssmClient = new SSMClient({ 
      region: process.env.AWS_REGION || 'eu-west-2' 
    })
    
    const command = new GetParametersCommand({
      Names: [
        '/amplify/d3m9wu6rhd9z99/main/AMPLIFY_COGNITO_USER_POOL_ID',
        'AMPLIFY_TEST'
      ]
    })
    
    const response = await ssmClient.send(command)
    
    const config: CognitoConfig = {}
    response.Parameters?.forEach(param => {
      if (param.Name?.includes('user-pool-id')) {
        config.userPoolId = param.Value
      } else if (param.Name?.includes('client-id')) {
        config.clientId = param.Value
      }
    })
    
    return config
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve configuration'
    })
  }
})








// import { transactionFilterZodObject } from "~/types/transactionFilter";
// import { GetItemCommand, GetItemInput } from "@aws-sdk/client-dynamodb"
// import connectDynamoDb from "../../plugins/dynamoDbClient"
// import { unmarshallDynamoItem } from "~/server/utils/unmarshallDynamoItems";

// export default defineEventHandler(async (event) => {
//     const params = await getValidatedQuery(event, data => transactionFilterZodObject.safeParse(data))
//     const userId = event.headers.get("userId") || "Invalid User ID"
//     const transactionId = event.headers.get("transactionId") || "Invalid Transaction ID"
//     const authorisationHeader = event.headers.get("authorisation")

//     if (!params.success) {
//         throw params.error.issues
//     }

//     const limit = params.data.limit
//     const page = params.data.page;
//     const skip = (page - 1) * limit;

//     if (!userId) {
//         throw "Error, no user ID!"
//     }

//     const input: GetItemInput = {
//         "Key": {
//             "userId": {
//                 "S": userId
//             },
//             "transactionId": {
//                 "S": transactionId
//             }
//         },
//         "TableName": "testFinBudgetTransactionsTable"
//     };

//     try {
//         const dynamoClient = await connectDynamoDb(authorisationHeader)
//         const marshalledTransactions = await dynamoClient.send(new GetItemCommand(input));
//         if (marshalledTransactions.Item) {
//             const transaction = unmarshallDynamoItem(marshalledTransactions.Item)
//             return transaction
//         }
//     } catch (err) {
//         console.error(err);
//     }
// });