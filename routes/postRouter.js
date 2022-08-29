const Router = require("express");
const router = new Router();
const PostController = require("../controller/postController.js");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, PostController.createPost);
router.get("/findAllPosts", authMiddleware, PostController.getAllPosts);
router.get(
  "/findAllUserPosts/:id",
  authMiddleware,
  PostController.getAllUserPosts
);

module.exports = router;
