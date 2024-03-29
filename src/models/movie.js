const { Model, DataTypes } = require("sequelize");
const User = require("../models/user");
const sequelize = require("../startup/db")
const Category = require("../models/category")


class Movie extends Model {}

Movie.init(
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
      type: DataTypes.INTEGER,
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
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
   category_id:{
    type: DataTypes.UUID,
    allowNull: false,
    references:{
    model: Category,
    key:"category_id"  }}},
  
    {sequelize,
    modelName: "Movie",
    tableName: "movies",
  });

  Movie.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });



module.exports = Movie;
