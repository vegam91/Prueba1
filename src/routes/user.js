const express = require("express");
const userControllers = require("../controllers/user");
const validate = require("../middleware/validate");
const { body } = require("express-validator");

const router = express.Router();

const userRegisterValidation = [
  body("nombre").notEmpty().withMessage("No puede estar vacío"),

  body("email").notEmpty().withMessage("No puede estar vacío"),

  body("contraseña")
    .notEmpty()
    .withMessage("No puede estar vacío")
    .isLength({ min: 8 })
    .withMessage("Al menos 8 caracteres"),
];
const userValidationSchemaByBody = [
  body("email")
    .notEmpty()

    .withMessage("can't be empty"),

  body("password")
    .notEmpty()

    .withMessage("can't be empty"),
];
router.post(
  "/register",
  validate,
  userRegisterValidation,
  userControllers.register
);

router.post("/login", userValidationSchemaByBody, validate, userControllers.login)


module.exports = router