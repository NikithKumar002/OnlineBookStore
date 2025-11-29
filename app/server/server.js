// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require('./config/db');

// dot env configuration
dotenv.config();
console.log(process.env.MONGO_URI);

// DB Connection
connectDB();

// rest object
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// app.use("/login", require("./routes/authRoute"));
app.use("/api/v1/test", require("./routes/healthCheckRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/books", require("./routes/booksRoutes"));

app.get('/', (req, res) => {
    return res.status(200).send("Welcome to Online Book Store!");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use((req, res) => {
    console.log(req.baseUrl)
    res.status(404).send("Route not found");
});

// Define listen PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
module.exports = app;