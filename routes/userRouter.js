const Router = require("express");
const router = new Router();
const UserController = require("../controller/userController.js");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/regist", UserController.registration);
router.post("/login", UserController.login);
router.get("/auth", authMiddleware, UserController.check);
router.delete("/delete/:id", authMiddleware, UserController.deleteUser);
router.put("/update/:id", authMiddleware, UserController.updateUserLogin);

module.exports = router;
