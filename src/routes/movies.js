const express = require("express");
const { param, body } = require("express-validator");
const router = express.Router();
const validate = require("../middleware/validate");
const isAuth = require("../middleware/isAuth");
const MovieControllers = require("../controllers/movies");

const Category = require("../models/category");

const ValidationSchemaByBody = [
  body("title")
    .isString()
    .withMessage("el titulo no está en formato valido")
    .notEmpty()
    .withMessage("el año de estreno es obligatorio"),
  body("releasedYear")
    .isInt()
    .withMessage("el año no está en formato valido")
    .notEmpty()
    .withMessage("el año de estreno es obligatorio"),
  body("categories")
    .isArray({ min: 1 })
    .withMessage("debe pasar una colección con almenos una categoría"),
  body("categories.*")
    .isMongoId()
    .withMessage("las categorias deben ir en formato valido"),
  body("categories.*").custom(async (categoryId) => {
    const category = await Category.findById(categoryId);

    if (!category) throw new Error("Categoria no registrada");
  }),
];

router.post(
  "/",
  isAuth,
  ValidationSchemaByBody,
  validate,
  MovieControllers.addNewMovie
);

module.exports = router;
