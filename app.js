require("dotenv").config();
const express = require("express");
const app = express();

const config = require("./src/startup/config");
require("./src/startup/db");
require("./src/startup/routes")(app, config);

app.listen(3000, () => console.log("SERVER ON...."));
