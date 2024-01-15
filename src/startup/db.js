const { Sequelize } = require("sequelize");
require ("dotenv").config()


process.env.NODE_ENV = process.env.NODE_ENV || 'development';


const sequelize = new Sequelize (process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASSWORD,{
host: process.env.DB_HOST,
dialect: process.env.DB_DIALECT,

});

  sequelize
    .authenticate()
    .then(() => console.log("MYSQL on..."))
    .catch((error) => {
      console.error("Error de conexión a MYSQL:", error.message);
      process.exit(1);
    });
;

module.exports = sequelize