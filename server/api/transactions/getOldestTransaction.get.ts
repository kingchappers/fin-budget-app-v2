//______________________________________________________________________________________________________
//______________________________________________________________________________________________________
//______________________________________________________________________________________________________
//      COMMENTING OUT THIS FUNCTION AS IT MAY NOT BE NECESSARY IN THE NEW VERSION
//      OF THE APP. I'M KEEPING THE FUNCTIONS AS A REFERENCE POINT IF I REQUIRE
//      IT LATER ON. IF I FULLY RECREATE THE APP AND STILL DON'T NEED THIS
//      FUNCTION I WILL REMOVE IT
//______________________________________________________________________________________________________
//______________________________________________________________________________________________________
//______________________________________________________________________________________________________

// import { Transaction } from "~/server/models/transaction.model";
// import { transactionFilterZodObject } from "~/types/transactionFilter";

// export default defineEventHandler(async (event) => {
//     const params = await getValidatedQuery(event, data => transactionFilterZodObject.safeParse(data))

//     if (!params.success) {
//         throw params.error.issues
//     }

//     const transaction = await Transaction.findOne().sort({ transactionDate: 1 }).lean().exec();

//     var transactionFound = false;

//     if (transaction) {
//         transactionFound = true;
//     }

//     return {
//         transaction,
//         transactionFound
//     };

// });