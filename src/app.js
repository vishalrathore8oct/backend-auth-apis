import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middlewares.js";

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static("public"))


// Imort Routes
import healthCheckRoutes from "./routes/healthCheck.routes.js";

// Routes
app.use("/api/v1/health-check", healthCheckRoutes)

// Global Error Handling Middleware
app.use(errorHandler)

export default app