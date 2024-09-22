import { DeleteItemCommand, DeleteItemInput } from "@aws-sdk/client-dynamodb"
import connectDynamoDb from "../../plugins/dynamoDbClient"
import { deleteTransactionZodObject } from "~/types/transactionZodObjects";

export default defineEventHandler(async (event) => {
    const params = await readValidatedBody(event, data => deleteTransactionZodObject.safeParse(data))

    if (!params.success) {
        throw params.error.issues
    }

    if (!params.data.transactionId) {
        params.data.transactionId = "Invalid Transaction ID"
        console.log("Invalid Transaction ID")
    }

    const userId = event.headers.get("userId") || "Invalid User ID"
    const authorisationHeader = event.headers.get("authorisation")
    const transactionId = params.data.transactionId

    if (!userId) {
        throw "Error, no user ID!"
    }

    const input: DeleteItemInput = {
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
        const dynamoClient = await connectDynamoDb(authorisationHeader);
        const deletedTransaction = dynamoClient.send(new DeleteItemCommand(input));
        return deletedTransaction
    } catch (err) {
        console.error(err);
    }
});