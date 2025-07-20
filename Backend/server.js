import express from "express"
import MongoDBClient from "./MongoDBClient.js";
import dotenv from "dotenv"
import path from 'path'
import router from "./routes/productroutes.js";

dotenv.config({override: true})

const __dirname = path.resolve();

const mongodb = new MongoDBClient(process.env.MONGODB_URI);
const app = express();

// Add this before any route definitions
app.set('strict routing', true);

app.use(express.json());

// Product routes
app.use("/api/products", router);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/Frontend/dist")));

    // Client-side routing - send all non-API requests to index.html
    app.get(/^(?!\/api).*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
    });
}

// Global error handler - must be last
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).json({ success: false, message: 'Server error' });
});

app.listen(process.env.PORT || 5000, () => {
    mongodb.connect();
    console.log(`Server started at http://localhost:${process.env.PORT || 5000}`);
});
