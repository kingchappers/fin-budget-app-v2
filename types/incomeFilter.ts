import { endOfMonth, startOfMonth } from "date-fns";
import { z } from "zod";

export interface incomeFilter {
    page?: number;
    limit?: number;
    userId: string;
    startDate?: Date;
    endDate?: Date;
}

export const incomeFilterZodObject = z.object({
    page: z.number().default(1),
    limit: z.number().default(50),
    // userId: string;
    startDate: z.date().default(startOfMonth(new Date())),
    endDate: z.date().default(endOfMonth(new Date())),
})
