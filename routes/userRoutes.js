const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

//SignIn
router.post("/signin", UserController.signin);

//SignUp
router.post("/signup", UserController.signup);

module.exports = router;