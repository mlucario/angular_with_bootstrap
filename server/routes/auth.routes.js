const { check } = require("express-validator");
const { signUp, signIn } = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();
const {
  validateEmailSignUp,
  validateEmailSignIn,
  validateRoles,
  validatePassword,
  validateConfirmPassword,
} = require("../middlewares/auth.validation");

router.post(
  "/signup",
  [
    validateEmailSignUp,
    validatePassword,
    validateConfirmPassword,
    validateRoles,
  ],
  signUp
);

router.post("/signin", [validateEmailSignIn, validatePassword], signIn);

module.exports = router;
