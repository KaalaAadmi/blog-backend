import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import blogRoutes from "./routes/blogs.js";
import path from "path";

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cors());
app.use(express.json());
app.use("/api/blog", blogRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(5000, () => {
  connect();
  console.log("Connected to Server");
});
