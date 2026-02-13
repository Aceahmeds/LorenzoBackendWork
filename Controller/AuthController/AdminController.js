import Admin from "../../Models/Admin/AdminModels.js";

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find()
      .select("+Password") // 🔥 VERY IMPORTANT
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      admins,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admins",
    });
  }
};
