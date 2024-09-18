import { transactionFilterZodObject } from "~/types/transactionFilter";
import { GetItemCommand, GetItemInput } from "@aws-sdk/client-dynamodb"
import connectDynamoDb from "../../plugins/dynamoDbClient"
import { unmarshallDynamoItem } from "~/server/utils/unmarshallDynamoItems";

export default defineEventHandler(async (event) => {
    const params = await getValidatedQuery(event, data => transactionFilterZodObject.safeParse(data))
    const userId = event.headers.get("userId") || "Invalid User ID"
    const transactionId = event.headers.get("transactionId") || "Invalid Transaction ID"
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

    const input: GetItemInput = {
        "Key": {
            "userId": {
                "S": userId
            },
            "transactionId": {
                "S": transactionId
            }
        },
        "TableName": "testFinBudgetTransactionsTable"
    };

    try {
        const dynamoClient = await connectDynamoDb(authorisationHeader)
        const marshalledTransactions = await dynamoClient.send(new GetItemCommand(input));
        if (marshalledTransactions.Item) {
            const transaction = unmarshallDynamoItem(marshalledTransactions.Item)
            return transaction
        }
    } catch (err) {
        console.error(err);
    }
});