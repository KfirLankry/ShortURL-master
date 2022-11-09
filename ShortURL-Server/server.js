const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const shortUrl = require("./routes/shortUrl");
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// End Points
app.use("/api/shortUrl", shortUrl);

// Connect to MongoDB
mongoose
  .connect(process.env.dbConnect, { useNewUrlParser: true })
  .then(() => console.log("Connected To MongoDB"))
  .catch(() => console.log("Cannot connect to server"));

app.listen(PORT, () => console.log("Server Connected to port" + PORT));
