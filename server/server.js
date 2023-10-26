import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { authRoutes } from "./routes/authRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();

const corsOption = { credentials: true, origin: [process.env.FRONT_END_URL] };

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

app.use("/api/v1/auth", authRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI)
  .then((data) => {
    app.listen(PORT, () => {
      console.log(`MongoDB connected with server ${data.connection.host}`);
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed. server not started");
    console.log(err);
  });
