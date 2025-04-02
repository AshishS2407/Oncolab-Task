# Diagnostics Lab Application

## Overview
The **Diagnostics Lab Application** is a web-based system designed to manage diagnostic lab transactions efficiently. It enables lab assistants and administrators to create, track, and filter transactions while maintaining data integrity and accessibility.

## Features

### 1. **Create Transaction**
- Lab assistants can create new transactions by entering details such as patient information, receipt number, visit date, gross amount, discount, and mode of payment.

### 2. **List All Transactions**
- Users can view all recorded transactions in a structured tabular format.
- Each transaction includes details such as patient name, receipt number, visit date, and financial information.

### 3. **Filter Transactions**
- Users can filter transactions based on predefined date ranges:
  - **This Week**: Displays transactions from the last 7 days.
  - **This Month**: Shows transactions from the current month.
  - **Custom Date Range**: Allows users to specify a start and end date to view transactions within a custom period.

### 4. **Edit & Delete Transactions (Yet to be Implemented)**
- Editing and deleting functionalities are planned for future implementation in the frontend.
- Editing will allow updating patient and financial details.
- Deleting will remove the transaction permanently from the system.

### 5. **Export Transactions to Excel**
- Users can export transaction records to an Excel file for further analysis or reporting purposes.

## Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: React Hooks
- **Excel Export**: XLSX Library

## Setup Instructions
### 1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/diagnostics-lab.git
   ```

### 2. Ensure the backend is running at `http://localhost:5000`
   ```sh
   cd backend
   npm install
   npm run start
   ```
### 3. Start the frontend (UI):
   ```sh
   cd ui
   npm install
   npm run dev
   ```
### 6. Access the application via `http://localhost:3000`

## Future Enhancements
- Role-based authentication (Admin, Lab Assistant, Patient)
- Graphical reports for financial insights
- Integration with external payment gateways

