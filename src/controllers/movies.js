const { Op } = require("sequelize");
const User = require("../models/user");
const Movie = require("../models/movie");
const Category = require("../models/category");
const MovieCategory = require("../relations/MovieCategory");
const sendEmail = require("../../utils/email");

const getAllMovies = async (req, res, next) => {
  try {
    console.log("AQUI EL CONTROLADOR");

    const movies = await Movie.findAll({
      where: {
        deleted: false,
      },
    });

    res.status(200).json({ message: "Todas las peliculas", movies });
  } catch (err) {
    console.error("Error al obtener las peliculas", err);
    next(err);
  }
};

const getUserMovies = async (req, res, next) => {
  try {
    console.log(req.query);
    let { search, category } = req.query;

    const filter = {
      owner: req.user._id,
      deleted: false,
    };

    if (search) {
      filter.title = { [Op.regexp]: search };
    }

    if (category) {
      if (typeof category === "string") {
        category = [category];
      }

      filter.categories = { [Op.in]: category };

      const movies = await Movie.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: "%" + search + "%" } },

            { category_id: { [Op.in]: category } },
          ],
        },
      });

      res.status(200).json({ message: "RESULTADO DE LA BUSQUEDA:", movies });
    } else {
      res.status(400).json({ message: "La busqueda con coincide" });
    }
  } catch (err) {
    console.error("Error en la busqueda", err);
    next(err);
  }
};

const getUserMovieById = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findOne({
      where: { movie_id: movieId, deleted: false },
    });

    if (!movie) {
      return res.status(404).json({ error: "Pelicula no encontrado" });
    }

    const isOwner = movie.user_id.toString() === req.user.user_id.toString();

    if (!isOwner) {
      return res
        .status(403)
        .json({ error: "La pelicula no pertenece al usuario" });
    }

    res.json(movie);
  } catch (err) {
    next(err);
  }
};

const createUserMovie = async (req, res, next) => {
  try {
    const { title, released_year, categories } = req.body;
    const userId = req.user.user_id;

    const newMovie = await Movie.create({
      title,
      released_year: released_year,
      user_id: userId,
      category_id: categories[0],
    });

    const categoryInstances = await Promise.all(
      categories.map((category) =>
        Category.findOrCreate({
          where: { name: category },
          defaults: { name: category },
        })
      )
    );

    await Promise.all(
      categoryInstances.map((categoryInstance) =>
        MovieCategory.create({
          category_id: categoryInstance[0].category_id,
          movie_id: newMovie.movie_id,
        })
      )
    );
    const allUsers = await User.findAll({ attibutes: ["user_email"] });

    allUsers.forEach(async (user) => {
      const notificacionContent = `Se ha añadido una pelicula nueva: ${newMovie.title}`;
      sendEmail(user.user_email, "Nueva Pelicula", notificacionContent);
    });

    res.status(201).json({ message: "Pelicula creada", newMovie });
  } catch (err) {
    next(err);
  }
};

const updateUserMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    console.log("AQUI movieId:", movieId);
    const { title, released_year, categories } = req.body;
    const userId = req.user.user_id;
    console.log("AQUI userId:", userId);

    const movie = await Movie.findByPk(movieId, {
      where: {
        movie_id: movieId,
        user_id: userId,
        deleted: false,
      },
    });
    console.log("AQUI Movie model:", Movie);
    console.log("AQUI Movie:", movie);

    if (!movie) {
      return res.status(404).json({
        error: "Película no encontrada",
        userId,
        movieId,
        title,
        released_year,
      });
    }

    const updateQuery = {
      title,
      released_year,
    };

    console.log(" AQUI Update Query:", updateQuery);
    console.log("Query de Actualización:", Movie.update);
    console.log("Antes de la consulta de actualización");

    const [updatedRowCount] = await Movie.update(
      { title, released_year },
      {
        where: {
          movie_id: movieId,
          user_id: userId,
          deleted: false,
        },
      }
    ).catch((error) => {
      console.error("error en la consulta", error);
    });
    console.log("Filas actualizadas:", updatedRowCount);
    if (updatedRowCount === 0) {
      console.error(
        "La película no fue encontrada o no se actualizó correctamente."
      );
      return res.status(404).json({ error: "Película no encontrada" });
    }

    await MovieCategory.destroy({
      where: {
        movie_id: movieId,
      },
    });

    for (const categoryId of categories) {
      try {
        const category = await Category.findByPk(categoryId);
        if (category) {
          await MovieCategory.create({
            category_id: categoryId,
            movie_id: movieId,
          });
        } else {
          console.error("Categoría no encontrada:", categoryId);
        }
        console.log(
          `AQUI Update Query (CategoryId: ${categoryId}):`,
          updateQuery
        );
      } catch (error) {
        console.error("Error en la asociación de categorías:", error);
      }
    }

    const updatedMovie = await Movie.findByPk(movieId);

    res.json(updatedMovie);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const logicalDeleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const userId = req.user.user_id;

    const movie = await Movie.findOne({
      where: {
        movie_id: movieId,
        user_id: userId,
        deleted: false,
      },
    });
    const category = await MovieCategory.findOne({
      where: {
        movie_id: movieId,

        deleted: false,
      },
    });

    if (!movie || !category) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    movie.deleted = true;
    category.deleted = true;

    await movie.save();
    await category.save();

    res.status(204).json({ message: "Pelicula eliminada correctamente" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  getAllMovies,
  getUserMovies,
  getUserMovieById,
  createUserMovie,
  updateUserMovie,
  logicalDeleteMovie,
};
