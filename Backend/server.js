const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const issueRoutes = require("./routes/issueRoutes");
const app = express();
const entrepreneurRoutes = require("./routes/entrepreneurRoutes");


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/entrepreneurs", entrepreneurRoutes);


app.get("/", (req, res) => {
    res.json({ message: "Public Infrastructure Reporting API is running" });
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error.message);
    });