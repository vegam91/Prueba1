const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    releasedYear: { type: Number, required: true },
    owner: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    categories:[{type: ObjectId,ref:"Category", required: true}]
  },
  // deleted: { type: Boolean},

  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
