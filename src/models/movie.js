const { Model, Datatypes } = require("sequelize");
const User = require("../models/user");

class Movie extends Model {}

User.init(
  {
    movie_id: {
      type: Datatypes.UUID,
      defaultValue: Datatypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    released_year: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: Datatypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    delete: {
      type: Datatypes.BOOLEAN,
    },
  },
  {
    sequelize,
    ModelName: "Movie",
    tableName: "Movies",
  }
);

module.exports = Movie;
