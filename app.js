require("dotenv").config();
const express = require("express");
const app = express();

require("./src/startup/db")();
require("./src/startup/routes")(app);

app.listen(3000, () => console.log("SERVER ON...."));
