import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectToDb from "./Database/Db.js";
import ErrorHandler from "./MiddleWares/ErrorHandlers.js";
import AuthRouter from "./Routes/AuthRoutes.js";
import ContactFormRouter from "./Routes/ContactFormRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import adminContactRoutes from "./Routes/adminContactRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ================= BODY PARSERS ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= CORS ================= */
app.use(cors({
  origin: process.env.ALLOW_ORIGIN || "https://lorenzo-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma"
  ],
  credentials: true
}));

/* Handle preflight explicitly */
app.options("*", cors());

/* ================= DATABASE ================= */
connectToDb();

/* ================= ROUTES ================= */
app.use("/api/auth", AuthRouter);
app.use("/api/contact/v1", ContactFormRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminContactRoutes);

/* ================= ERROR HANDLER ================= */
app.use(ErrorHandler);

/* ================= START SERVER ================= */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
