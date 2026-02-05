const express = require("express");
const router = express.Router();
const passport = require("passport");
const conversationController = require("../controllers/conversationController");

router.use(passport.authenticate("jwt", { session: false }));

router.post("/", conversationController.createConversation);
router.get("/", conversationController.getMyConversations);

module.exports = router;
