const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const movieSchema = new mongoose.Schema({
  nombre: { type: String, required: true },

  añoEstreno: { type: String, required: true },

  fechaCreacion: { type: Date, default: Date.now },

  fechaActualización: { type: Date, default: Date.now },

  categoria: [{ type: ObjectId, ref: "Movie" }],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
