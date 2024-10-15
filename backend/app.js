const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(cors());
const mongoUrl = process.env.MONGODB_URL;
mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl, (err) => {
  if (err) throw err;
  console.log("Mongodb connected...");
});

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../dist/index.html"))
  );
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
