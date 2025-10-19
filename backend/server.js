// server.js
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Import seeded users
const users = require("./data/users");

// 🔑 LOGIN API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, "secretkey", { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

// 🌍 GEOLOCATION API
app.get("/api/geo", async (req, res) => {
  try {
    const response = await fetch(`https://ipinfo.io/json?token=${process.env.IPINFO_TOKEN}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch geo info" });
  }
});

// 🚀 Start server
const PORT = 8000;
app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`));
