# FrachDark E-commerce Project

## Getting Started

Follow these steps to run the application locally.

### Prerequisites
- Node.js (v18+)
- MySQL/MariaDB database

### 1. Database Setup
1. Create a database named `meubles_db`.
2. Import the provided SQL dump into `meubles_db`.

### 2. Backend (NestJS)
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=meubles_db
   PORT=3001
   ```
4. Start the server:
   ```bash
   npm run start:dev
   ```

### 3. Frontend (Next.js)
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features
- **Premium UI**: Immersive dark mode design with glassmorphism.
- **Dynamic Catalog**: Browse products by category with real-time filtering.
- **Custom Dimensions**: Support for "Sur Mesure" products.
- **Shopping Cart**: Persistent cart management.
- **Checkout**: Integrated ordering system.
