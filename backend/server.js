import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

const app = express();
const port = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

//routes api 
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(` Server Started on port: ${port}`);
});
