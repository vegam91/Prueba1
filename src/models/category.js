const { Model, DataTypes } = require("sequelize");
const sequelize = require("../startup/db")
class Category extends Model {}

Category.init(
  {
    category_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "categories",
  }
);

module.exports = Category;
