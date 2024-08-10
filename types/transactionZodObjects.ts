import { z } from "zod";

export const transactionZodObject = z.object({
    transactionDate: z.coerce.date(),
    vendor: z.string(),
    value: z.number(),
    category: z.string(),
    items: z.string().optional(),
    notes: z.string().optional(),
    userId: z.string(),
})

export const deleteTransactionZodObject = z.object({
    userId: z.string(),
    _id: z.string()
})