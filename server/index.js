import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import { pool } from "./database/index.js";

dotenv.config({ quiet: true });

const PORT = process.env.SERVER_PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);

const startServer = async () => {
  try {
    await pool.query("Select 1");

    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
