require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const requireAuth = require("./middleware/requireAuth");
const reportsRoutes = require("./routes/reports");
const userRoutes = require("./routes/user");

const PORT = process.env.PORT || 4000;

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/user", userRoutes);

app.use(requireAuth); // require authentication for the /reports api
app.use("/api/reports", reportsRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(PORT, () => {
      console.log("listening for requests on port", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
