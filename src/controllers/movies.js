const Movie = require("../models/movie");

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
    const { title, releasedYear, categories } = req.body;
    const owner = req.user._id;
    const newMovie = await Movie.create({
      title,
      releasedYear,
      owner,
      categories: [...new Set(categories)],
    });

    res.status(201).json(newMovie);
  } catch (err) {
    next(err);
  }
};
const updateUserMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { title, releasedYear, categories } = req.body;

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

    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { title, releasedYear, categories },
      { new: true }
    );

    res.json(updatedMovie);
  } catch (err) {
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
