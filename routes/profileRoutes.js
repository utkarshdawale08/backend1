const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createProfile, getProfile, updateProfile } = require("../controller/profileController");

const router = express.Router();

router.post("/", authMiddleware, createProfile);
router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, updateProfile);

module.exports = router;
