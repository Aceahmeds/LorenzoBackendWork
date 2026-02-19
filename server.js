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


  // create a server
  const app = express();
  const PORT = process.env.PORT || 5001;

  // ----------------------
  // 1️⃣ Body Parser
  app.use(express.json());

  // 2️⃣ CORS (Always before routes)
  app.use(cors({
    origin: process.env.ALLOW_ORIGIN || "https://lorenzo-frontend.vercel.app",
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

  // 3️⃣ Connect to Database
  connectToDb();

  // 4️⃣ Routes
  app.use("/api/auth", AuthRouter);
  app.use("/api/contact/v1", ContactFormRouter);
  app.use("/api/admin", adminRoutes);
  app.use("/api/admin", adminContactRoutes);
    

  // 5️⃣ Error Handler (Always last)w
  app.use(ErrorHandler);

  // Start Server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

