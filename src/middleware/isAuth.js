const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["x-auth-token"];


if(req.path === "/allmovies"){
  return next()
}
  if (!token) return res.status(401).send("No hay token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(400).send("Token invalido");
  }
};
