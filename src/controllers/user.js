const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");


const register = async (req, res, next) => {
  try {
    const dataUser = req.body;
    const existingUser = await User.findOne({
      where: { user_name: dataUser.user_name },
    });
    if (existingUser) {
      return res.status(400).json({
        error: "Nombre de usuario en uso",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(dataUser.password, saltRounds);

    const newUser = await User.create({
      user_name: dataUser.user_name,
      password:  hashedPassword,
    });
    const token = newUser.generateJWT();

    res.status(201).json({ message: "Usuario registrado", token });
  } catch (err) {
    console.error("Error en el registro", err);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { user_name, password: plainTextPassword } = req.body;

    const user = await User.findOne({ where: { user_name } });
    if (!user) {
      return res
        .status(400)
        .json({ error: "El usuario o contraseña no coinciden" });
    }

    const isValidPassword = await bcrypt.compare(
      plainTextPassword,
      user.password
    );

    if (!isValidPassword) {
      return res
        .status(400)
        .json({ error: "El usuario o contraseña no coinciden" });
    }

    const token = user.generateJWT();
    res
      .setHeader("x-auth-token", token)
      .setHeader("Access-Control-Expose-Headers", "x-auth-token")
      .status(201)
      .json({ message: "Usuario logueado" });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
