require("dotenv").config()

module.exports = {
  secretKey: process.env.JWT_PRIVATE_KEY,
};