import { Transaction } from "~/server/models/transaction.model";
import { transactionFilterZodObject } from "~/types/transactionFilter";

export default defineEventHandler(async (event) => {
    //Validate the passed parameters
    const params = await getValidatedQuery(event, data => transactionFilterZodObject.safeParse(data))
    console.log(params)

    if (!params.success) {
        throw params.error.issues
    }

    const limit = params.data.limit
    const page = params.data.page;
    const skip = (page - 1) * limit;

    const transactions = await Transaction.find().sort({ transactionDate: -1 }).skip(skip).limit(limit).lean().exec();;


    return transactions;
});
