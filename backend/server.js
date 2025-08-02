const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const propertyRoutes = require("../backend/routes/propertyRoutes");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
connectDB();
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", propertyRoutes);


// Connect to MongoDB


// Sample route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
