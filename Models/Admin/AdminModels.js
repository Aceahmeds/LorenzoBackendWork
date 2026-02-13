// import mongoose from "mongoose";


// const AdminSchema = mongoose.Schema({
//     Name:{
//         type:String,
//         required:true,
//          trim: true
//     },
//     Email:{
//         type: String,
//       required: true,
//       lowercase: true,
//       trim: true
//     },
//     Password:{
//         type: String,
//       required: true,
//       trim: true,
//         select: false 
//     },

// },
//   {
//     timeStamps:true
//   }
// )

// export default mongoose.model("Admin",AdminSchema);

import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },

    Email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    Password: {
      type: String,
      required: true,
      trim: true,
      select: false, // 🔐 security (correct)
    },
  },
  {
    timestamps: true, // ✅ FIXED
  }
);

export default mongoose.model("Admin", AdminSchema);
