export type transactionType = {
    transactionDate: Date;
    vendor: String;
    value: number;
    items?: String;
    notes?: String;
    userId: String;
    id: String;
}