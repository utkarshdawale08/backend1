const Profile = require("../model/profile");

const createProfile = async (req, res) => {
  const { name, rollNumber, class: studentClass, department, teacher, phoneNumber } = req.body;

  if (!name || !rollNumber || !studentClass || !department || !teacher || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "All profile fields are required: name, rollNumber, class, department, teacher, phoneNumber",
    });
  }

  try {
    const existingProfile = await Profile.findOne({ userId: req.user._id });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists for this user",
      });
    }

    const profile = new Profile({
      name,
      rollNumber,
      class: studentClass,
      department,
      teacher,
      phoneNumber,
      userId: req.user._id,
    });

    await profile.save();

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Create profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating profile",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user._id }).populate("userId", "name email");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found for current user",
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
    });
  }
};

const updateProfile = async (req, res) => {
  const rollNumberQuery = req.query.rollNumber;
  if (!rollNumberQuery) {
    return res.status(400).json({
      success: false,
      message: "rollNumber query parameter is required to select the profile to update",
    });
  }

  const { name, rollNumber, class: studentClass, department, teacher, phoneNumber } = req.body;

  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (rollNumber !== undefined) updateData.rollNumber = rollNumber;
  if (studentClass !== undefined) updateData.class = studentClass;
  if (department !== undefined) updateData.department = department;
  if (teacher !== undefined) updateData.teacher = teacher;
  if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one profile field must be provided to update",
    });
  }

  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user._id, rollNumber: rollNumberQuery },
      updateData,
      { new: true, runValidators: true }
    ).populate("userId", "name email");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found for current user with the provided rollNumber",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating profile",
    });
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
};
