import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FilterTransactionsPage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleFilter = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/transactions/filter?from=${from}&to=${to}`);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching filtered transactions:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar Menu */}
      <div
        className={`bg-gray-700 text-white w-64 h-full fixed top-0 py-24 left-0 transition-transform z-40 ${menuOpen ? "transform-none" : "-translate-x-full"}`}
      >
        <div className="p-4">
          {/* Dropdown Header */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full text-left bg-gray-800 p-3 rounded-md flex justify-between items-center hover:bg-gray-700 transition"
          >
            <span className="text-lg font-semibold">Financial MIS Reports</span>
            <span>{dropdownOpen ? "▲" : "▼"}</span>
          </button>

          {/* Dropdown Content */}
          {dropdownOpen && (
            <div className="mt-2 space-y-3">
              <div className="bg-gray-800 p-3 rounded-md hover:bg-blue-600 transition">
                <Link to="/transaction-list" className="block text-white font-medium">
                  Bill Transaction Report
                </Link>
              </div>

              <div className="bg-gray-800 p-3 rounded-md hover:bg-blue-600 transition">
                <Link to="/create-transaction" className="block text-white font-medium">
                  Create Report
                </Link>
              </div>

              <div className="bg-gray-800 p-3 rounded-md hover:bg-blue-600 transition">
                <Link to="/filter-transactions" className="block text-white font-medium">
                  Billing Statement
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 p-6 transition-all duration-300 ${menuOpen ? "ml-64" : ""}`}>
        <div className="bg-gray-500 text-white p-4 flex justify-between items-center">
          {/* Hamburger Icon */}
          <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fas fa-bars"></i>
          </button>
          <h2 className="text-lg font-bold">Oncolab Diagnostics LLC</h2>
          <h2 className="text-lg font-bold">
            <Link to="/">Home</Link>
          </h2>
        </div>

        <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-4">
          <h2 className="text-3xl font-bold text-center mb-8">Billing Statement</h2>

          {/* Date Inputs & Filter Button */}
          <div className="flex justify-between mb-6">
            <div className="flex">
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="border p-2 mr-4 rounded-lg"
              />
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="border p-2 mr-4 rounded-lg"
              />
            </div>
            <button
              onClick={handleFilter}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div key={transaction._id} className="border-b-2 mb-6 pb-6 p-6 bg-gray-50 rounded-lg">
                  {/* Patient Details Section */}
                  <div className="border-b pb-4 mb-4">
                    <h3 className="text-2xl font-semibold mb-2 text-blue-700">Patient Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                      <p><strong>Patient Name:</strong> {transaction.patientName}</p>
                      <p><strong>Visit Date:</strong> {new Date(transaction.visitDate).toLocaleDateString()}</p>
                      <p><strong>Visit ID:</strong> {transaction.visitId}</p>
                      <p><strong>Client:</strong> {transaction.clientName}</p>
                    </div>
                  </div>

                  {/* Bill Summary Section */}
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="text-xl font-semibold mb-2 text-blue-700">Bill Summary</h4>
                    <table className="min-w-full border">
                      <thead>
                        <tr className="border-b bg-gray-200">
                          <th className="text-left py-2 px-4">Description</th>
                          <th className="text-right py-2 px-4">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4">Amount Paid</td>
                          <td className="py-2 px-4 text-right">{transaction.paidAmount.toFixed(2)}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">Mode of Payment</td>
                          <td className="py-2 px-4 text-right">{transaction.modeOfPayment}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 mt-6">No transactions found for the selected date range.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTransactionsPage;
