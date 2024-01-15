const { Model, DataTypes } = require("sequelize");
const sequelize = require("../startup/db")
const jwt = require("jsonwebtoken")
const { secretKey } = require("../startup/config")

class User extends Model {

  generateJWT() {
    const payload = {
      user_id: this.user_id,
      user_name: this.user_name,
    };
    console.log("AQUI JWT",payload)
    console.log("private key aqui", secretKey)

    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
  }

}

User.init(
  {
    user_id: {
      type: DataTypes.UUID,
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
