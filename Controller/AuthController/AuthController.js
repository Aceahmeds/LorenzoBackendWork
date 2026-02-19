import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../../Models/Admin/AdminModels.js";

/* ================= REGISTER ================= */
const registerAdmin = async (req, res) => {
  try {
    // const { Name, Email, Password } = req.body;
  const { Name, Email, Password } = req.body || {};
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
    console.error("Register Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= LOGIN ================= */
const loginAdmin = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    // 🔍 Check fields
    if (!Email || !Password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 🔥 VERY IMPORTANT: +Password
    const admin = await Admin.findOne({ Email }).select("+Password");

    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(Password, admin.Password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 🔑 Generate token
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ❌ Remove password before sending response
    admin.Password = undefined;

    res.status(200).json({
      success: true,
      token,
      admin,
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};


/* ================= PROTECT MIDDLEWARE ================= */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.adminId = decoded.id;
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { registerAdmin, loginAdmin, protect };
