export type transactionType = {
    transactionDate: Date;
    vendor: String;
    value: number;
    category: String;
    items?: String;
    notes?: String;
    userId: String;
}