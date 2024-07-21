<script setup>
import TransactionType from "~/types/transactionType"

const props = defineProps({
    transaction: TransactionType
})
</script>

<template>
        <td className="px-3 lg:px-5">{{transaction.transactionDate}}</td>
        <td className="px-3 lg:px-5">{{transaction.vendor}}</td>
        <td className="px-3 lg:px-5">£{{transaction.value.toFixed(2)}}</td>
        <td className="px-3 lg:px-5">{{transaction.category}}</td>
        <td className="px-3 lg:px-5">{{transaction.items}}</td>
        <td className="px-3 lg:px-5">{{transaction.notes}}</td>
        <!-- <td>
            <TransactionItemMenu transaction={transaction} isEditingTransaction={isEditingTransaction}
                setIsEditingTransaction={setIsEditingTransaction} />
        </td> -->
</template>