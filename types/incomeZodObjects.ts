import { z } from "zod";

export const incomeZodObject = z.object({
    incomeDate: z.coerce.date(),
    company: z.string(),
    amount: z.number(),
    incomeCategory: z.string(),
    items: z.string().optional(),
    notes: z.string().optional(),
    userId: z.string(),
})

export const incomeFormZodObject = z.object({
    incomeDate: z.coerce.date(),
    company: z.string(),
    amount: z.number(),
    incomeCategory: z.string(),
    items: z.string().optional(),
    notes: z.string().optional(),
})

export const deleteincomeZodObject = z.object({
    incomeId: z.string(),
})

export const updateIncomeZodObject = z.object({
    incomeDate: z.coerce.date(),
    company: z.string(),
    amount: z.number(),
    incomeCategory: z.string(),
    items: z.string().optional(),
    notes: z.string().optional(),
    incomeId: z.string(),
})