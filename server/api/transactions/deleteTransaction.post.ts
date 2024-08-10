import { Transaction } from "~/server/models/transaction.model";
import { deleteTransactionZodObject } from "~/types/transactionZodObjects";

export default defineEventHandler(async (event) => {
    const params = await readValidatedBody(event, data => deleteTransactionZodObject.safeParse(data))
    if (!params.success) {
        throw params.error.issues
    }

    const userId = params.data.userId;
    const _id = params.data._id;

    const transaction = await Transaction.findByIdAndDelete({ userId: userId, _id: _id}).exec();

    return { transaction };
});