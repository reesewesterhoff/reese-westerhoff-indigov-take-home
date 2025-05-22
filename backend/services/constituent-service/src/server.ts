import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { errorHandler } from "./middleware/errorHandler";
import { constituentRoutes } from "./routes/constituentRoutes";

// Load environment variables from .env file
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

// Connect to MongoDB
connectDB();

// Basic Route for testing
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from constituent app");
});

// API Routes
// All item routes will be prefixed with /api/items
app.use("/api/constituents", constituentRoutes);

// Get port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
