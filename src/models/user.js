const { Model, DataTypes } = require("sequelize");
const sequelize = require("../startup/db")
class User extends Model {}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

module.exports = User;
