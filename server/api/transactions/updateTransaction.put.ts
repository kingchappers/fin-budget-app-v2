import { Transaction } from "~/server/models/transaction.model";
import { updateTransactionZodObject } from "~/types/transactionZodObjects";

export default defineEventHandler(async (event) => {
    const params = await readValidatedBody(event, data => updateTransactionZodObject.safeParse(data))
    if (!params.success) {
        throw params.error.issues
    }

    const transactionDate = params.data.transactionDate;
    const vendor = params.data.vendor;
    const value = params.data.value;
    const category = params.data.category;
    const items = params.data.items;
    const notes = params.data.notes;
    const _id = params.data._id;

    const transaction = await Transaction.findByIdAndUpdate(_id, {transactionDate, vendor, value, category, items, notes}).lean().exec();

    return { transaction };
});