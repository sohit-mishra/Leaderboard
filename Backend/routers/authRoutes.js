const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
