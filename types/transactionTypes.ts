export type transactionType = {
    _id: string;
    transactionDate: Date;
    vendor: string;
    value: number;
    category: string;
    items?: string;
    notes?: string;
    userId: string;
}

