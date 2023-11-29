const express = require("express");
const userControllers = require("../controllers/user");
const validate = require("../middleware/validate");
const { body } = require("express-validator");

const router = express.Router();

const userValidationSchemaByBody = [
  body("username")
    .notEmpty()
    .withMessage("el nombre de usuario es obligatorio"),
  body("password")
    .notEmpty()
    .withMessage("el password es obligatorio")
    .isLength({ min: 8 })
    .withMessage("el password debe tener mínimo 8 caracteres"),
];

router.post(
  "/register",
  userValidationSchemaByBody,
  validate,
  userControllers.register
);

router.post(
  "/login",
  userValidationSchemaByBody,
  validate,
  userControllers.login
);

module.exports = router;
