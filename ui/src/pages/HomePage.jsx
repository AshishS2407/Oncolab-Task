import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Oncolab Diagnostics LLC</h2>
        
        <div className="text-center mt-6">
          <p className="text-lg text-gray-600 mb-4">Welcome to Oncolab Diagnostics Portal</p>
          <p className="text-sm text-gray-500 mb-6">Please select an option to proceed:</p>
          <div className="space-y-4">
            <button
              onClick={() => navigate("/create-transaction")}
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Create Transaction
            </button>
            <button
              onClick={() => navigate("/transaction-list")}
              className="w-full bg-blue-200 text-gray-700 p-3 rounded-md hover:bg-blue-300 transition duration-300"
            >
              List Transactions
            </button>
            <button
              onClick={() => navigate("/filter-transactions")}
              className="w-full bg-blue-100 text-gray-700 p-3 rounded-md hover:bg-blue-200 transition duration-300"
            >
              Filter Transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
