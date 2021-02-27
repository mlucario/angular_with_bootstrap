
const { signUp, signIn } = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();
// * GET LITTMITER
const limiter = require('../middlewares/limiter.config');

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
    // limiter.createAccountLimiter
  ],
  signUp
);

router.post("/signin", [validateEmailSignIn, validatePassword], signIn);

module.exports = router;
