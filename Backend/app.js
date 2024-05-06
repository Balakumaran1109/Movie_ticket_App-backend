import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-router.js";
import movieRouter from "./routes/movie-router.js";
import bookingRouter from "./routes/booking-router.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());

const DB_URL = `mongodb+srv://balakumaran1109:${process.env.DB_Password}@cluster0.eonfmcs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(DB_URL, {})
  .then(() => {
    console.log(`Mongo Db connected`);
  })
  .catch((err) => console.log(err));

// middlewares
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingRouter);

app.listen(5000, () => {
  console.log(`Server is running on PORT ${5000}`);
});
