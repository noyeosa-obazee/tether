const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.searchUsers,
);

module.exports = router;
