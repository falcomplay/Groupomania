// Imports
const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

//Router
router.post("/:postId", commentCtrl.createComment);
router.get("/", auth, commentCtrl.findAllComments);
router.delete("/:id", auth, commentCtrl.deleteOneComment);

module.exports = router;
