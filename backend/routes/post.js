// Imports
const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer");
const auth = require("../middleware/auth");

//Router
router.post("/new", multer, postCtrl.createPost);

router.get("/:id", auth, postCtrl.findOnePost);
router.get("/", auth, postCtrl.findAllPost);

router.delete("/:id", auth, postCtrl.deleteOnePost);

module.exports = router;
