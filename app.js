require ("dotenv").config()
const express = require ("express");
const app = express();

require("./src/startup/db")();

app.listen(3000, () => console.log("SERVER ON....")) 