import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../../Models/Admin/AdminModels.js";

/* ================= REGISTER ================= */
const registerAdmin = async (req, res) => {
  try {
    console.log("REGISTER METHOD:", req.method);
    console.log("REGISTER BODY:", req.body);

    // 🔒 Safe body handling
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing",
      });
    }

    const { Name, Email, Password } = req.body;

    // 1️⃣ Validation
    if (!Name || !Email || !Password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Check existing admin
    const adminExists = await Admin.findOne({ Email });
    if (adminExists) {
      return res.status(409).json({
        success: false,
        message: "Admin already exists",
      });
    }

    // 3️⃣ Hash password
    const hashPassword = await bcrypt.hash(Password, 10);

    // 4️⃣ Create admin
    const admin = await Admin.create({
      Name,
      Email,
      Password: hashPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      userId: admin._id,
    });

  } catch (error) {
    console.error("REGISTER ERROR FULL:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


/* ================= LOGIN ================= */
const loginAdmin = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing",
      });
    }

    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({ Email }).select("+Password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(Password, admin.Password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    admin.Password = undefined;

    return res.status(200).json({
      success: true,
      token,
      admin,
    });

  } catch (error) {
    console.error("LOGIN ERROR FULL:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


/* ================= PROTECT MIDDLEWARE ================= */
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.adminId = decoded.id;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export { registerAdmin, loginAdmin, protect };
