const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
