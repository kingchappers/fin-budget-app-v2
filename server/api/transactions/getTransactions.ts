import { Transaction } from "~/server/models/transaction.model";

export default defineEventHandler(async (event) => {
    const transactions = await Transaction.find();

    return transactions;
});