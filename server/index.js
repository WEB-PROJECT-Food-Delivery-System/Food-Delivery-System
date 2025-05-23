const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
  .catch((err) => console.error(err));

  const authRoutes = require("./routes/auth");

// Add this line
app.use("/api/auth", authRoutes);

const protectedRoutes = require("./routes/protected");
app.use("/api", protectedRoutes);


