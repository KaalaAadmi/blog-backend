import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import blogRoutes from "./routes/blogs.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();
// const __dirname = path.dirname("");


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

// const buildPath = path.join(__dirname, "../client/build");

// app.use(express.static(buildPath));
// app.get("/*", function (req, res) {
//   res.sendFile(
//     path.join(__dirname, "../client/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });

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
