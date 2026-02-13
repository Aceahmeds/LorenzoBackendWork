  import mongoose from "mongoose";

  const ownerSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  const Owner = mongoose.model("Owner", ownerSchema);
  export default Owner;
