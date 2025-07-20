# Product Store

A web application for managing products with a React frontend and MongoDB backend.

## Description

This project is a full-stack application that allows users to manage a product inventory. It uses React for the frontend user interface and MongoDB for data storage.

## Technologies

- JavaScript
- React
- Node.js
- Express
- MongoDB
- npm

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SAVAGEAKALIA/product-store.git
   cd product-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

## Configuration

The application uses environment variables for configuration:
- `MONGODB_URI`: Connection string for MongoDB
- `PORT`: Server port (default: 5000)

## Usage

### Development

Run the development server:
```bash
npm run dev
```

### Production

Build and start the production server:
```bash
npm run build
npm start
```

## API Endpoints

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a single product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

