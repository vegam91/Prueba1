const { Op } = require("sequelize");
const sequelize = require("../startup/db");
const Movie = require("../models/movie");
const Category = require("../models/category");

const MovieCategory = require("../relations/MovieCategory");

const getUserMovies = async (req, res, next) => {
  try {
    console.log(req.query);
    let { search, category } = req.query;

    const filter = {
      owner: req.user._id,
      deleted: false,
    };

    if (search) {
      filter.title = { $regex: search };
    }

    if (category) {
      if (typeof category === "string") category = [category];

      filter.categories = { $in: category };
    }

    const movies = await Movie.find(filter).populate("categories");

    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
};

const getUserMovieById = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findOne({ _id: movieId, deleted: false });

    if (!movie) {
      return res.status(404).json({ error: "Pelicula no encontrado" });
    }

    const isOwner = movie.owner.toString() === req.user._id;

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

    res.status(201).json(newMovie);
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
          [Op.or]: [{ deleted: false }, { deleted: null }],
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

    const movie = await Movie.findOne({ _id: movieId, deleted: false });

    if (!movie) {
      return res.status(404).json({ error: "Pelicula no encontrado" });
    }

    const isOwner = movie.owner.toString() === req.user._id;

    if (!isOwner) {
      return res
        .status(403)
        .json({ error: "La pelicula no pertenece al usuario" });
    }

    movie.deleted = true;

    const deletedMovie = await movie.save();

    res.status(204).json(deletedMovie);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserMovies,
  getUserMovieById,
  createUserMovie,
  updateUserMovie,
  logicalDeleteMovie,
};
