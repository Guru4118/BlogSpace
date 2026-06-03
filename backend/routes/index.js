const express = require("express");
const { register, login } = require("../controllers/authController");
const { createBlog, getBlogs } = require("../controllers/blogController");
const { createComment, getComments } = require("../controllers/commentController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

router.post("/blogs", verifyToken, createBlog);
router.get("/blogs", getBlogs);

router.post("/comments", verifyToken, createComment);
router.get("/comments/:id", getComments);

module.exports = router;
