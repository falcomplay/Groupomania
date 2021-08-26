const express = require("express");
const router = express.Router();

const loginCtrl = require("../controllers/login");
const rateLimit = require("../utils/expresslimit");

//Router
router.post("/signup", loginCtrl.signup);
router.post("/login", rateLimit.limiter, loginCtrl.login);

module.exports = router;
