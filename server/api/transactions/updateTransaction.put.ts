import { PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb"
import connectDynamoDb from "../../plugins/dynamoDbClient"
import { updateTransactionZodObject } from "~/types/transactionZodObjects";

export default defineEventHandler(async (event) => {
    const params = await readValidatedBody(event, data => updateTransactionZodObject.safeParse(data))

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

    if (!params.data.items) {
        params.data.items = ""
    }

    if (!params.data.notes) {
        params.data.notes = ""
    }

    const transactionParams: PutItemCommandInput = {
        "TableName": "testFinBudgetTransactionsTable",
        "Item": {
            "transactionDate": {
                "S": params.data.transactionDate.toDateString()
            },
            "vendor": {
                "S": params.data.vendor
            },
            "value": {
                "N": params.data.value.toString()
            },
            "category": {
                "S": params.data.category
            },
            "items": {
                "S": params.data.items
            },
            "notes": {
                "S": params.data.notes
            },
            "userId": {
                "S": userId
            },
            "transactionId": {
                "S": transactionId
            }
        }
    }

    try {
        const dynamoClient = await connectDynamoDb(authorisationHeader)
        const data = await dynamoClient.send(new PutItemCommand(transactionParams));
    } catch (err) {
        console.error(err);
    }
});