const router = require('express').Router();

const { register, login, forgotpassword, resetpassword } = require("../controllers/auth");

router.route("/register").post(register); // call the auth in controllers

router.route("/login").post(login);

//router.route("/forgotpassword").post(forgotpassword);

//router.route("/passwordreset/:resetToken").put(resetpassword);

module.exports = router;