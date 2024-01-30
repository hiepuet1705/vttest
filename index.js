import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connect } from "./database/database.js";
import UserRouter from "./routes/users.js";
const app = express();

const PORT = 8000;
await connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/users", UserRouter);
app.listen(PORT, () =>
  console.log(`Your server is running successfully on port ${PORT}`)
);
