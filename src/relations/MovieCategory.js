const { Model, DataTypes } = require("sequelize");
const Category = require("../models/category");
const Movie = require("../models/movie");

class MovieCategory extends Model {}

MovieCategory.init(
  {
    relation_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    categroy_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Category,
        key: "movie_id",
      },
    },
    movie_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Movie,
        key: movie_id,
      },
    },
  },
  { sequelize, 
    modelName: "MovieCategory", 
    tableName: "movies_categories" 
}
);

module.exports= MovieCategory
