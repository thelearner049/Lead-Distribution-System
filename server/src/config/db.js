const mongoose = require("mongoose");
const dns = require("node:dns/promises");

async function connectDB() {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Error:", err);
  }
}

module.exports = connectDB;
