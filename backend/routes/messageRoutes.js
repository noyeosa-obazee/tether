const express = require("express");
const router = express.Router();
const passport = require("passport");
const messageController = require("../controllers/messageController");

router.use(passport.authenticate("jwt", { session: false }));

router.post("/", messageController.sendMessage);
router.get("/:conversationId", messageController.getMessages);
router.put("/:id", messageController.editMessage);
router.delete("/:id", messageController.deleteMessage);

module.exports = router;
