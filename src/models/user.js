const { Model, Datatypes } = require("sequelize");

class User extends Model {}

User.init(
  {
    user_id: {
      type: Datatypes.UUID,
      defaultValue: Datatypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    ModelName: "User",
    tableName: "Users",
  }
);

module.exports = User;
