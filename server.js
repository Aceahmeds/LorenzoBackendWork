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
const PORT = process.env.PORT || 5001;

// ----------------------
// 🔥 Connect Database (Safe for serverless)
connectToDb();

// ----------------------
// 🔥 Body Parser
app.use(express.json());

// ----------------------
// 🔥 CORS (Production Ready)
const allowedOrigins = [
  "https://lorenzo-frontend.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// 🔥 Handle Preflight Requests
app.options("*", cors());

// ----------------------
// 🔥 Routes
app.use("/api/auth", AuthRouter);
app.use("/api/contact/v1", ContactFormRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminContactRoutes);

// ----------------------
// 🔥 Global Error Handler
app.use(ErrorHandler);

// ----------------------
// 🔥 LOCAL DEVELOPMENT ONLY
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// ✅ EXPORT for Vercel
export default app;
