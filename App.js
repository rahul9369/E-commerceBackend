const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRouter");
require("dotenv").config();

// Apply CORS Middleware before any routes
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });

// Use routes
app.use(productRoutes);
app.use(userRoutes);

// Fallback route for unmatched endpoints
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// General error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server on PORT or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
