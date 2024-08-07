import { Transaction } from "~/server/models/transaction.model";
import { transactionZodObject } from "~/types/transactionZodObject";

export default defineEventHandler(async (event) => {
    const params = await readValidatedBody(event, data => transactionZodObject.safeParse(data))
    if (!params.success) {
        throw params.error.issues
    }

    const transactionDate = params.data.transactionDate;
    const vendor = params.data.vendor;
    const value = params.data.value;
    const category = params.data.category;
    const items = params.data.items;
    const notes = params.data.notes;
    const userId = params.data.userId;

    const transaction = await Transaction.create({ transactionDate, vendor, value, category, items, notes, userId });

    return { transaction };
    // return {params, event }

});