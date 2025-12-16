import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // connect DB first
    app.use("/api/users", authRoutes);

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error("Server failed to start:", error.message);
  }
};

startServer();

