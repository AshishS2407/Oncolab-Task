# 🏥 Diagnostics Lab Application

## 📌 Overview
The **Diagnostics Lab Application** is a web-based system designed to efficiently manage diagnostic lab transactions. It enables lab assistants and administrators to create, track, and filter transactions while maintaining data integrity and accessibility.

---

## 🚀 Features

### 1️⃣ **Create Transaction** 📝
✅ Lab assistants can create new transactions by entering details such as:
- 🏥 Patient information
- 🧾 Receipt number
- 📅 Visit date
- 💲 Gross amount, discount, and mode of payment

### 2️⃣ **Billing Statement** 📑
✅ Users can view all recorded transactions in a structured, easy-to-read tabular format.
✅ Each transaction includes details such as:
- 🏥 Patient name
- 🧾 Receipt number
- 📅 Visit date
- 💰 Financial details

### 3️⃣ **Bill Transaction Report** 📊
✅ Users can filter transactions based on predefined date ranges:
- 📆 **This Week**: Displays transactions from the last 7 days.
- 📆 **This Month**: Shows transactions from the current month.
- 📅 **Custom Date Range**: Allows users to specify a start and end date to view transactions within a custom period.

### 4️⃣ **Edit & Delete Transactions (Coming Soon 🚧)**
🛠 Editing and deleting functionalities are planned for future implementation in the frontend.
- ✏ **Edit**: Modify patient and financial details.
- ❌ **Delete**: Permanently remove a transaction from the system.

### 5️⃣ **Export Transactions to Excel** 📂
✅ Users can **export transaction records** to an **Excel file** for further analysis or reporting purposes.

---

## 🛠 Technologies Used
🔹 **Frontend**: React, Tailwind CSS  
🔹 **Backend**: Node.js, Express.js  
🔹 **Database**: MongoDB  
🔹 **State Management**: React Hooks  
🔹 **Excel Export**: XLSX Library  

---

## 🏗 Setup Instructions
### 🔽 1. Clone the repository:
```sh
 git clone https://git@github.com:AshishS2407/Oncolab-Task.git
 cd Oncolab-Task
```

### 🔽 2. Ensure the backend is running at `http://localhost:5000`
```sh
 cd backend
 npm install
 npm run start
```

### 🔽 3. Start the frontend (UI):
```sh
 cd ui
 npm install
 npm run dev
```

### 🌐 4. Access the application via `http://localhost:3000`

---

## 🔮 Future Enhancements
🔜 **Role-based authentication** (Admin, Lab Assistant, Patient)  
📊 **Graphical reports** for financial insights  
💳 **Integration with external payment gateways**  

---
