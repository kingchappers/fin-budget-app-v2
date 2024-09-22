import { PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb"
import connectDynamoDb from "../../plugins/dynamoDbClient"
import { transactionZodObject } from "~/types/transactionZodObjects";
import crypto from "crypto"

export default defineEventHandler(async (event) => {
    const params = await readValidatedBody(event, data => transactionZodObject.safeParse(data))
    const authorisationHeader = event.headers.get("authorisation")

    if (!params.success) {
        throw params.error.issues
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
                "S": params.data.userId
            },
            "transactionId": {
                "S": crypto.randomUUID()
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