import express from "express";
import path from "path";
import dotenv from "dotenv";
import dbConnect from "./utils/db.js";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import cookieParser from "cookie-parser";
import stockRouter from "./routes/stockRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "*" }));

// app.use(express.static(path.resolve("./public")));

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);
app.use("/api/stock", stockRouter);

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is listening at http://localhost:${PORT}`);
});
