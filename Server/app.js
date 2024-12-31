require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authenticateToken=require("./middleware/auth")
const userRoutes = require("./route/user");
const addressRoutes = require("./route/address");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to the protected route!", user: req.user });
});

app.use("/api/users", userRoutes);
app.use("/api/addresses", addressRoutes);

module.exports=app