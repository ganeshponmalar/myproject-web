import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js"
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json())

const PORTs = process.env.PORT || 5000;

app.use("/api/users",authRoutes)

console.log("Mongo URI:", process.env.MONGODB_URI);

// connect to database
connectDB();

app.listen(PORTs, () => {
    console.log(`Server started at port ${PORTs}`);
});

