import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CreateTransactionPage = () => {
  const [receiptNumber, setReceiptNumber] = useState("");
  const [patientName, setPatientName] = useState("");
  const [clientName, setClientName] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitId, setVisitId] = useState("");
  const [grossAmount, setGrossAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [netAmount, setNetAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [dueAmount, setDueAmount] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/transactions/create", {
        receiptNumber,
        patientName,
        clientName,
        visitDate,
        visitId,
        grossAmount,
        discount,
        netAmount,
        paidAmount,
        dueAmount,
        modeOfPayment,
      });
      setReceiptNumber("");
      setPatientName("");
      setClientName("");
      setVisitDate("");
      setVisitId("");
      setGrossAmount("");
      setDiscount("");
      setNetAmount("");
      setPaidAmount("");
      setDueAmount("");
      setModeOfPayment("");
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      <div className={`bg-gray-800 text-white w-64 h-full py-24 fixed top-0 left-0 transition-transform z-40 ${menuOpen ? "transform-none" : "-translate-x-full"}`}>
        <div className="p-4">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-full text-left bg-gray-800 p-3 rounded-md flex justify-between items-center hover:bg-gray-700 transition">
            <span className="text-lg font-semibold">Financial MIS Reports</span>
            <span>{dropdownOpen ? "▲" : "▼"}</span>
          </button>
          {dropdownOpen && (
            <div className="mt-2 space-y-3">
              <Link to="/transaction-list" className="block bg-gray-700 p-3 rounded-md hover:bg-blue-600 transition">Bill Transaction Report</Link>
              <Link to="/create-transaction" className="block bg-gray-700 p-3 rounded-md hover:bg-blue-600 transition">Create Report</Link>
              <Link to="/filter-transactions" className="block bg-gray-700 p-3 rounded-md hover:bg-blue-600 transition">Billing Statement</Link>
            </div>
          )}
        </div>
      </div>
      
      <div className={`flex-1 p-6 transition-all duration-300 ${menuOpen ? "ml-64" : ""}`}>
        <div className="bg-gray-500 text-white p-4 flex justify-between items-center">
          <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fas fa-bars"></i>
          </button>
          <h2 className="text-lg font-bold">Oncolab Diagnostics LLC</h2>
          <h2 className="text-lg font-bold">
            <Link to="/">Home</Link>
          </h2>
        </div>

        <div className="bg-white p-6 shadow-md rounded-md mt-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Transaction</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="Receipt Number" value={receiptNumber} onChange={(e) => setReceiptNumber(e.target.value)} className="border p-2 w-full rounded-md" required />
              <input type="text" placeholder="Patient Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} className="border p-2 w-full rounded-md" required />
              <input type="text" placeholder="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} className="border p-2 w-full rounded-md" required />
              <input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} className="border p-2 w-full rounded-md" required />
              <input type="text" placeholder="Visit ID" value={visitId} onChange={(e) => setVisitId(e.target.value)} className="border p-2 w-full rounded-md" required />
              <input type="number" placeholder="Gross Amount" value={grossAmount} onChange={(e) => setGrossAmount(e.target.value)} className="border p-2 w-full rounded-md" required />
              <input type="number" placeholder="Discount" value={discount} onChange={(e) => setDiscount(e.target.value)} className="border p-2 w-full rounded-md" required />
              <input type="number" placeholder="Net Amount" value={netAmount} onChange={(e) => setNetAmount(e.target.value)} className="border p-2 w-full rounded-md" required />
              <input type="number" placeholder="Paid Amount" value={paidAmount} onChange={(e) => setPaidAmount(e.target.value)} className="border p-2 w-full rounded-md" required />
              <input type="number" placeholder="Due Amount" value={dueAmount} onChange={(e) => setDueAmount(e.target.value)} className="border p-2 w-full rounded-md" required />
              <select value={modeOfPayment} onChange={(e) => setModeOfPayment(e.target.value)} className="border p-2 w-full rounded-md" required>
                <option value="">Select Mode of Payment</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash">Cash</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Create Transaction</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTransactionPage;
