const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  contraseña: { type: String, required: true, minlength: 8 },

  movies: [{ type: ObjectId, ref: "Movie" }],
});

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.jwtPrivateKey
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;
