import { Transaction } from "~/server/models/transaction.model";
import { z } from 'zod'

const transactionFilter = z.object({
    page: z.number().default(1),
    limit: z.number().default(50),
    // userId: string;
})

export default defineEventHandler(async (event) => {
    //Validate the passed parameters
    const params = await getValidatedQuery(event, data => transactionFilter.safeParse(data))

    if (!params.success) {
        throw params.error.issues
    }

    const limit = params.data.limit
    const page = params.data.page;
    const skip = (page - 1) * limit;

    const transactions = await Transaction.find().sort({ transactionDate: -1 }).skip(skip).limit(limit).lean().exec();;


    return transactions;
});
