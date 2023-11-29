const mongoose = require("mongoose");

module.exports = (err, req, res, next) => {
  console.error(err);
  if (err instanceof mongoose.Error.CastError) {
    // Aquí iría lógica para por ejemplo guardar registro en un fichero de log db para este tipo de excepción específica.
  }

  res.status(500).json({ error: "Error del servidor. Volvemos pronto!" });
};
