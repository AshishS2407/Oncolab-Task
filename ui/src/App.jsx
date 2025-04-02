import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FilterTransactionsPage from "./pages/FilterTransactionsPage";
import CreateTransactionPage from "./pages/CreateTransactionPage";
import TransactionListPage from "./pages/TransactionListPage";
import '@fortawesome/fontawesome-free/css/all.min.css';
import HomePage from "./pages/HomePage";


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/filter-transactions" element={<FilterTransactionsPage />} />
        <Route path="/create-transaction" element={<CreateTransactionPage />} />
        <Route path="/transaction-list" element={<TransactionListPage />} />
      </Routes>
    </Router>
  );
};

export default App;