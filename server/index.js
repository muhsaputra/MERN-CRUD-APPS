import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT;
const MONGGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGGOURL)
  .then(() => {
    console.log("Database Connected...");
    app.listen(PORT, () => {
      console.log(`Server Is Running...`);
    });
  })
  .catch((error) => console.log(error));

app.use("/api", route);
