import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectToDb from "./Database/Db.js";
import ErrorHandler from "./MiddleWares/ErrorHandlers.js";
import AuthRouter from "./Routes/AuthRoutes.js";
import ContactFormRouter from "./Routes/ContactFormRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import adminContactRoutes from "./Routes/adminContactRoutes.js";

// ----------------------
// 1️⃣ Create Express App
const app = express();
const PORT = process.env.PORT || 5001;
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || "https://lorenzo-frontend.vercel.app";

// ----------------------
// 2️⃣ Middleware
// Body parser
app.use(express.json());

// CORS
app.use(cors({
  origin: ALLOW_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma"
  ],
  credentials: true
}));

// ----------------------
// 3️⃣ Connect to Database
connectToDb();

// ----------------------
// 4️⃣ Routes
app.use("/api/auth", AuthRouter);
app.use("/api/contact/v1", ContactFormRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/contact", adminContactRoutes); // Fixed conflict

// ----------------------
// 5️⃣ Error Handler
app.use(ErrorHandler);

// ----------------------
// 6️⃣ Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`CORS allowed origin: ${ALLOW_ORIGIN}`);
});
