import { Transaction } from "~/server/models/transaction.model";
import { transactionFilterZodObject } from "~/types/transactionFilter";

export default defineEventHandler(async (event) => {
    const params = await getValidatedQuery(event, data => transactionFilterZodObject.safeParse(data))

    var transaction = await Transaction.findOne().sort({ transactionDate: 1 }).lean().exec();

    var transactionFound = false;

    if (transaction) {
        transactionFound = true;
    }

    return {
        transaction,
        transactionFound
    };

});