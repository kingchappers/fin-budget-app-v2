import { z } from "zod";

export const transactionZodObject = z.object({
    transactionDate: z.date(),
    vendor: z.string(),
    value: z.number(),
    category: z.string(),
    items: z.string(),
    notes: z.string(),
    userId: z.string(),
})
