const Movie = require("../models/movie");

const addNewMovie = async (req, res) => {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const getMoviesById = (req,res) =>{

    const {id}=req.param
}

module.exports = { addNewMovie };
