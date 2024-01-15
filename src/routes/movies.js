const express = require("express");
const { param, body, query } = require("express-validator");
const router = express.Router();
const validate = require("../middleware/validate");
const isAuth = require("../middleware/isAuth");
const MovieControllers = require("../controllers/movies");
const sequelize = require("../startup/db");
const Category = require("../models/category")



const validationSchemaByBody = [
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
    const category = await Category.findByPk(categoryId);

    if (!category) throw new Error("Categoria no registrada");
  }),
];
const validationSchemaByParam = [
  param("movieId")
    .isMongoId()
    .withMessage("el id debe estar en formato valido"),
];

const validationSchemaByQuery = [
  query("category")
    .optional()
    .custom((value) => {
      if (Array.isArray(value)) return true;
      if (mongoose.Types.ObjectId.isValid(value)) return true;

      throw new Error("las categorias deben ir en formato valido");
    }),
  query("category.*")
    .optional()
    .isMongoId()
    .withMessage("las categorias deben ir en formato valido"),
];

router.get(
  "/",
  isAuth,
  validationSchemaByQuery,
  validate,
  MovieControllers.getUserMovies
);

router.get(
  "/:movieId",
  isAuth,
  validationSchemaByParam,
  validate,
  MovieControllers.getUserMovieById
);

router.post(
  "/",
  isAuth,
  validationSchemaByBody,
  validate,
  MovieControllers.createUserMovie
);

router.put(
  "/:movieId",
  isAuth,
  validationSchemaByParam,
  validationSchemaByBody,
  validate,
  MovieControllers.updateUserMovie
);

router.delete(
  "/:movieId",
  isAuth,
  validationSchemaByParam,
  validate,
  MovieControllers.logicalDeleteMovie
);

module.exports = router;
