import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();


router.post("/create", async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/fetch", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ visitDate: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/filter", async (req, res) => {
  try {
    const { from, to } = req.query;
    const query = {};

    // Build query based on the provided dates
    if (from) query.visitDate = { $gte: new Date(from) };
    if (to) query.visitDate = { ...query.visitDate, $lte: new Date(to) };

    // Fetch transactions from database
    const transactions = await Transaction.find(query).sort({ visitDate: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update/:receiptNumber", async (req, res) => {
  try {
    const { receiptNumber } = req.params;

    const updatedTransaction = await Transaction.findOneAndUpdate(
      { receiptNumber }, 
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:receiptNumber", async (req, res) => {
  try {
    const { receiptNumber } = req.params;
    const deletedTransaction = await Transaction.findOneAndDelete({ receiptNumber });

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully", deletedTransaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
