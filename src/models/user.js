const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true, minlength: 8 },
});

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_PRIVATE_KEY
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;
