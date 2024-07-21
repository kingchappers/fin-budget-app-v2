import { endOfMonth, startOfMonth } from "date-fns";
import { z } from "zod";

export interface transactionFilter{
    page?: number;
    limit?: number;
    userId: string;
    startDate?: Date;
    endDate?: Date;
}

export const transactionFilterZodObject = z.object({
    page: z.number().default(1),
    limit: z.number().default(50),
    // userId: string;
    startDate: z.date().default(startOfMonth(new Date())),
    endDate: z.date().default(endOfMonth(new Date())),
})
