import Host from "../../Models/Host/HostModels.js";
import Owner from "../../Models/Owners/OwnerModels.js";

/* ================= OWNER FORM ================= */
const registerContactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message, type } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const newOwner = await Owner.create({
      firstName,
      lastName,
      email,
      phone,
      message,
      type,
    });

    res.status(201).json({
      success: true,
      message: "Owner form submitted successfully",
      data: newOwner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

/* ================= HOST FORM ================= */
const registerHost = async (req, res) => {
  try {
    const { hostName, businessName, email, phone, city, message, type } = req.body;

    if (!hostName || !businessName || !email || !phone || !city || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newHost = await Host.create({
      hostName,
      businessName,
      email,
      phone,
      city,
      message,
      type,
    });

    res.status(201).json({
      success: true,
      message: "Host form submitted successfully",
      data: newHost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



export { registerContactForm, registerHost };
