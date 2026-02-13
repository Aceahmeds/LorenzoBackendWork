// import express from "express";
// import { protect } from "../Controller/AuthController/AuthController.js";
// import AdminModels from "../Models/Admin/AdminModels.js";

// const router = express.Router();

// router.get("/all", protect, async (req, res) => {
//   try {
//     const admins = await AdminModels.find().select("-Password");
//     res.status(200).json(admins);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;

import express from "express";
import { getAllAdmins } from "../Controller/AuthController/AdminController.js";
import { protect } from "../Controller/AuthController/AuthController.js";

const router = express.Router();

router.get("/all", protect, getAllAdmins);

export default router;
