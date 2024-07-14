import { Transaction } from "~/server/models/transaction.model";
// import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    const transactions = await Transaction.find();
    const { startDate, endDate } = await readBody(event)
    return transactions;
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