const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authMiddleware = require("./authentication");
const route = require("./Routes/Route");

const app = express();
const port = process.env.PORT || 3000;

const mongoURI = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/sla1";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection error'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Built-in middleware
app.use(express.json());

// Custom/Application level middleware
const middleware1 = (req, res, next) => {
  console.log("Middleware 1 is executed");
  next();
};

const middleware2 = (req, res, next) => {
  console.log("Middleware 2 is executed");
  next();
};

app.use(middleware1);
app.use(middleware2);

// Third-party / Router level middleware
app.use(bodyParser.json());

// Configurable middleware
app.use(authMiddleware);

// Use the blog controller
app.use("/api2", route);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});