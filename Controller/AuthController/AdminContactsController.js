import Owner from "../../Models/Owners/OwnerModels.js";
import Host from "../../Models/Host/HostModels.js";
export const getAllContacts = async (req, res) => {
  try {
    const owners = await Owner.find().sort({ createdAt: -1 });
    const hosts = await Host.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      owners,
      hosts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
