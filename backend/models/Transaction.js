import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  receiptNumber: { type: String, required: true },
  patientName: { type: String, required: true },
  clientName: { type: String, required: true },
  visitDate: { type: Date, required: true },
  visitId: { type: String, required: true },
  grossAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  netAmount: { type: Number, required: true },
  paidAmount: { type: Number, required: true },
  dueAmount: { type: Number, required: true },
  modeOfPayment: { type: String, required: true },
});

export default mongoose.model("Transaction", TransactionSchema);

