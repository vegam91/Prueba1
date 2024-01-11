const { Model, DataTypes } = require("sequelize");
const User = require("../models/user");
const sequelize = require("../startup/db")
class Movie extends Model {}

User.init(
  {
    movie_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released_year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    delete: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: "Movie",
    tableName: "Movies",
  }
);

module.exports = Movie;
