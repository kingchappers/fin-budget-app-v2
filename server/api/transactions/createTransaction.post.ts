import { PutItemCommand } from "@aws-sdk/client-dynamodb"
import connectDynamoDb from "../../plugins/dynamoDbClient"
import { transactionZodObject } from "~/types/transactionZodObjects";


export default defineEventHandler(async (event) => {
    const params = await readValidatedBody(event, data => transactionZodObject.safeParse(data))
    if (!params.success) {
        throw params.error.issues
    }

    if (!params.data.items) {
        params.data.items = ""
    }

    if (!params.data.notes) {
        params.data.notes = ""
    }

    const transactionParams = {
        TableName: "testFinBudgetTransactionsTable",
        Item: {
            transactionDate: { S: params.data.transactionDate.toDateString() },
            vendor: { S: params.data.vendor },
            value: { N: params.data.value.toString() },
            category: { S: params.data.category },
            items: { S: params.data.items },
            notes: { S: params.data.notes },
            userId: { S: params.data.userId },
            transactionId: { S: "testID" }

        }
    }

    console.log("event header: " + event.headers)

    const authorisationHeader = event.headers.get("authorisation")
    console.log("test value: " + authorisationHeader)

    // const transactionDate = params.data.transactionDate;
    // const vendor = params.data.vendor;
    // const value = params.data.value;
    // const category = params.data.category;
    // const items = params.data.items;
    // const notes = params.data.notes;
    // const userId = params.data.userId;

    // const transaction = await Transaction.create({ transactionDate, vendor, value, category, items, notes, userId });

    try {
        const dynamoClient = await connectDynamoDb(authorisationHeader)
        const data = await dynamoClient.send(new PutItemCommand(transactionParams));
        console.log("success");
        console.log(data);
    } catch (err) {
        console.error(err);
    }

});