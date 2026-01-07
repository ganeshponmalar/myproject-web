import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/auth.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());        // parse JSON body
app.use(cookieParser());        // parse cookies


app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,               // ⭐ allow cookies
  })
);
// Routes
app.use("/api/users", userRoutes);

// Test route (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
