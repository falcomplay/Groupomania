const express = require("express");
const router = express.Router();

const loginCtrl = require("../controllers/login");

//Router
router.post("/signup", loginCtrl.signup);
router.post("/login", loginCtrl.login);

module.exports = router;
