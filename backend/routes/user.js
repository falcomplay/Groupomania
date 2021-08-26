const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.get("/userId", userCtrl.findOneProfile);
router.get("/", auth, userCtrl.findAllProfile);
router.delete("/:userId", auth, userCtrl.deleteOneUser);
router.get("/:id", auth, userCtrl.findFriendProfile);

module.exports = router;
