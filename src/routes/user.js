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

router.post(
  "/register",
  validate,
  userRegisterValidation,
  userControllers.register
);

module.exports = router