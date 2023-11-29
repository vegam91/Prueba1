require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("./src/models/category");

require("./src/startup/db")();

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

const docs = categories.map((category) => new Category({ name: category }));

loadSeed();

async function loadSeed() {
  try {
    await Category.deleteMany({});

    const createdDocs = await Category.create(docs);

    console.log("Categorias creadas:");
    console.log(
      createdDocs.map((doc) => ({ id: doc._id.toString(), name: doc.name }))
    );
    mongoose.disconnect();
  } catch (err) {
    console.log("Error al cargar la semilla");
  }
}
