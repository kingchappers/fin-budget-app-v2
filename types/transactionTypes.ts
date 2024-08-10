export type transactionType = {
    _id: String;
    transactionDate: Date;
    vendor: String;
    value: number;
    category: String;
    items?: String;
    notes?: String;
    userId: String;
}

