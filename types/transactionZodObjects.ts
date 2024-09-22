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

export const transactionFormZodObject = z.object({
    transactionDate: z.coerce.date(),
    vendor: z.string(),
    value: z.number(),
    category: z.string(),
    items: z.string().optional(),
    notes: z.string().optional(),
})

export const deleteTransactionZodObject = z.object({
    transactionId: z.string(),
})

export const updateTransactionZodObject = z.object({
    transactionDate: z.coerce.date(),
    vendor: z.string(),
    value: z.number(),
    category: z.string(),
    items: z.string().optional(),
    notes: z.string().optional(),
    transactionId: z.string(),
})