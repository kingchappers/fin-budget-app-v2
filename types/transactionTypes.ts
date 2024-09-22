export type transactionType = {
    transactionId: string;
    transactionDate: Date;
    vendor: string;
    value: number;
    category: string;
    items?: string;
    notes?: string;
    userId: string;
}

