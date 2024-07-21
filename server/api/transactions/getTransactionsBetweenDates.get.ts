import { Transaction } from "~/server/models/transaction.model";
import { transactionFilterZodObject } from "~/types/transactionFilter";

export default defineEventHandler(async (event) => {
    const params = await getValidatedQuery(event, data => transactionFilterZodObject.safeParse(data))

    if (!params.success) {
        throw params.error.issues
    }

    const transactions = await Transaction.find({ transactionDate: { $gte: params.data?.startDate, $lte: params.data?.endDate } }).sort({ transactionDate: -1 }).lean().exec();

    const results = transactions.length;

    return {
        transactions,
        results
    };

});

// ____________________________________________________________________
//BELOW IS HOW YOU CAN USE THE ENDPOINT WITH EXTRA VARIABLES
//REPLACE POST WITH GET, PUT, ETC. AS APPROPRIATE
// ____________________________________________________________________
// <script setup>
// const { data, fetch } = useFetch('/api/my-endpoint', {
//   method: 'GET', // Adjust method as needed (GET, PUT, etc.)
//   body: {
//     // Other data to send (if any)
//     startDate: mystartDate,
//     endDate: myendDate,
//   },
// });
// </script>