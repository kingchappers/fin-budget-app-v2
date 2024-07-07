import mongoose, { Mongoose } from "mongoose";
const schema = new mongoose.Schema(
    {
        checked: { type: Boolean, default: false },
        transactionDate: { type: Date, required: true },
        vendor: { type: String, required: true },
        value: { type: Number, required: true },
        category: { type: String, required: true },
        items: { type: String, required: false },
        notes: { type: String, required: false },
        userId: { type: String, required: true },
        // // _id: { mongoose.Types.ObjectId, required: true},
        // id: { type: String, required: true, unique: true },
    },
    //   { timestamps: true, strict: true, strictQuery: true }
);
export const Transaction = mongoose.model("Transaction", schema, "transaction");