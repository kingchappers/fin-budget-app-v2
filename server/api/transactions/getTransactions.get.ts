import { transactionFilterZodObject } from "~/types/transactionFilter";
import { QueryCommand, QueryInput } from "@aws-sdk/client-dynamodb"
import connectDynamoDb from "../../plugins/dynamoDbClient"
import { unmarshallDynamoItemArray } from "~/server/utils/unmarshallDynamoItems";

export default defineEventHandler(async (event) => {
    const params = await getValidatedQuery(event, data => transactionFilterZodObject.safeParse(data))
    const userId = event.headers.get("userId") || "Invalid User ID"
    const authorisationHeader = event.headers.get("authorisation")

    if (!params.success) {
        throw params.error.issues
    }

    const limit = params.data.limit
    const page = params.data.page;
    const skip = (page - 1) * limit;

    if (!userId) {
        throw "Error, no user ID!"
    }

    const input: QueryInput = {
        "ExpressionAttributeValues": {
            ":userId": {
                "S": userId
            }
        },
        "KeyConditionExpression": "userId = :userId",
        "TableName": "testFinBudgetTransactionsTable"
    };

    try {
        const dynamoClient = await connectDynamoDb(authorisationHeader)
        const marshalledTransactions = await dynamoClient.send(new QueryCommand(input));
        if (marshalledTransactions.Items) {
            const transactions = unmarshallDynamoItemArray(marshalledTransactions.Items)
            return transactions
        }
    } catch (err) {
        console.error(err);
    }
});
