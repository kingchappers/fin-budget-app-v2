import { z } from "zod";
import { Transaction } from "~/server/models/transaction.model";
import { stringToObjectId } from "~/server/utils/stringToObjectId";

const id = z.object({
    id: z.string()
})

export default defineEventHandler(async (event) => {
    const params = await getValidatedQuery(event, data => id.safeParse(data))

    if (!params.success) {
        throw params.error.issues
    }

    if (params && params.data) {
        const parsedId = stringToObjectId(params.data.id);

        if (!parsedId) {
            return { error: "Transaction not found" };
        }

        const transaction = await Transaction.findById(parsedId).lean().exec();
        if (transaction) {
            return {
                transaction,
            };
        } else {
            return { error: "Transaction not found" };
        }
    }
});