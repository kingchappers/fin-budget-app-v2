import { z } from "zod";

export interface transactionFilter{
    page?: number;
    limit?: number;
    userId: string;
}

export const transactionFilterZodObject = z.object({
    page: z.number().default(1),
    limit: z.number().default(50),
    // userId: string;
})
