import express from "express";
import { protect } from "../Controller/AuthController/AuthController.js";
import { getAllContacts } from "../Controller/AuthController/AdminContactsController.js";

const router = express.Router();


router.get("/contacts", protect, getAllContacts);

export default router;
