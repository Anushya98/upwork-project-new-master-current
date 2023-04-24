const express = require("express");
const router = express.Router();
const userController = require("../controller/usercontroller.js");
const { protect, authorize } = require("../middleware/aauth");

router.post("/", userController.addUser);
router.get("/", userController.getAllUsers);
router.route("/current").get(userController.currentUser);
router.get("/:id", userController.getById);
router.put("/:id", protect, userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/count", userController.getUsersCount);

module.exports = router;
