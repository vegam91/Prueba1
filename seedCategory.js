require("dotenv").config();
const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("./src/startup/db")
const Category = require("./src/models/category");

require("./src/startup/db");

const categories = [
  "Terror",
  "Suspense",
  "Romántico",
  "Acción",
  "Fantasía",
  "Comedia",
  "Aventura",
  "Drama",
];


loadSeed();

async function loadSeed() {
  try {
    await sequelize.sync({force:true});

    const createdDocs = await Category.bulkCreate(
      categories.map((category)=>({name:category}))
    );

    console.log("Categorias creadas:");
    console.log(
      createdDocs.map((doc) => ({ id: doc.category_id, name: doc.name }))
    );
    await sequelize.close();
  } catch (err) {
    console.error("Error al cargar la semilla:", err);
  }
}
