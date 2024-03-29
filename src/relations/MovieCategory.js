const { Model, DataTypes } = require("sequelize");
const Category = require("../models/category");
const Movie = require("../models/movie");
const sequelize = require("../startup/db")



class MovieCategory extends Model {}

MovieCategory.init(
  {
    relation_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Category,
        key: "category_id",
      },
    },
    movie_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Movie,
        key: "movie_id",
      },
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    },

  
  { sequelize, 
    modelName: "MovieCategory", 
    tableName: "movies_categories" 
}
);

module.exports= MovieCategory
