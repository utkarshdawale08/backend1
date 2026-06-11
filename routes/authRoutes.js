const express = require("express");
const { registerUser, getRegisterInfo, loginUser } = require("../controller/authController");

const router = express.Router();

router.get("/register", getRegisterInfo);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
