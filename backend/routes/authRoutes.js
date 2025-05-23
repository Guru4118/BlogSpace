const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js")
const { login, register,getMe } = require("../controllers/authController.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get('/me', authMiddleware, getMe);

module.exports = router;
