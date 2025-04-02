import { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";

const TransactionListPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/transactions/fetch");
        setTransactions(response.data);
        setFilteredTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !contentRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filterTransactions = (type) => {
    setFilter(type);
    const now = new Date();
    let startDate;

    if (type === "week") {
      startDate = new Date();
      startDate.setDate(now.getDate() - 7);
      setFilteredTransactions(transactions.filter((txn) => {
        const txnDate = new Date(txn.visitDate);
        return txnDate >= startDate && txnDate <= now;
      }));
    } else if (type === "month") {
      setFilteredTransactions(transactions.filter((txn) => {
        const txnDate = new Date(txn.visitDate);
        return txnDate.getMonth() === now.getMonth() && txnDate.getFullYear() === now.getFullYear();
      }));
    } else if (type === "custom" && customStartDate && customEndDate) {
      startDate = new Date(customStartDate);
      const endDate = new Date(customEndDate);
      setFilteredTransactions(transactions.filter((txn) => {
        const txnDate = new Date(txn.visitDate);
        return txnDate >= startDate && txnDate <= endDate;
      }));
    } else {
      setFilteredTransactions(transactions);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredTransactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "Transactions.xlsx");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar Menu */}
      <div className={`bg-gray-700 text-white w-64 h-full fixed top-0 py-24 left-0 transition-transform z-40 ${menuOpen ? "transform-none" : "-translate-x-full"}`}>
        <div className="p-4">
          {/* Dropdown Header */}
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-full text-left bg-gray-800 p-3 rounded-md flex justify-between items-center hover:bg-gray-700 transition">
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
        
        <div className="bg-white p-4 shadow-md rounded-md mt-4">
          <div className="flex space-x-4">
            <select onChange={(e) => filterTransactions(e.target.value)} className="border px-4 py-2 rounded">
              <option value="all">All</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="custom">Custom</option>
            </select>
            {filter === "custom" && (
              <>
                <input type="date" value={customStartDate} onChange={(e) => setCustomStartDate(e.target.value)} className="border px-2 py-1 rounded" />
                <input type="date" value={customEndDate} onChange={(e) => setCustomEndDate(e.target.value)} className="border px-2 py-1 rounded" />
                <button onClick={() => filterTransactions("custom")} className="bg-blue-500 text-white px-4 py-2 rounded">Apply</button>
              </>
            )}
            <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded">Export to Excel</button>
          </div>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border px-4 py-2">S.No</th>
                <th className="border px-4 py-2">Receipt Number</th>
                <th className="border px-4 py-2">Patient Name</th>
                <th className="border px-4 py-2">Client Name</th>
                <th className="border px-4 py-2">Visit Date</th>
                <th className="border px-4 py-2">Visit ID</th>
                <th className="border px-4 py-2">Gross Amount</th>
                <th className="border px-4 py-2">Discount</th>
                <th className="border px-4 py-2">Net Amount</th>
                <th className="border px-4 py-2">Paid Amount</th>
                <th className="border px-4 py-2">Due Amount</th>
                <th className="border px-4 py-2">Mode of Payment</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr key={transaction._id} className="border">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{transaction.receiptNumber}</td>
                  <td className="border px-4 py-2">{transaction.patientName}</td>
                  <td className="border px-4 py-2">{transaction.clientName}</td>
                  <td className="border px-4 py-2">{new Date(transaction.visitDate).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{transaction.visitId}</td>
                  <td className="border px-4 py-2">{transaction.grossAmount}</td>
                  <td className="border px-4 py-2">{transaction.discount}</td>
                  <td className="border px-4 py-2">{transaction.netAmount}</td>
                  <td className="border px-4 py-2">{transaction.paidAmount}</td>
                  <td className="border px-4 py-2">{transaction.dueAmount}</td>
                  <td className="border px-4 py-2">{transaction.modeOfPayment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionListPage;
