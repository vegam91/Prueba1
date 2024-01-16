const { Sequelize } = require('sequelize');

module.exports = (err, req, res, next) => {
  console.error(err);

  if (err instanceof Sequelize.EmptyResultError) {
    return res.status(404).json({ error: "Película no encontrada" });
  }

  res.status(500).json({ error: "Error del servidor. Volvemos pronto!" });
};
