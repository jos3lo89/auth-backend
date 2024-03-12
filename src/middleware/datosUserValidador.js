import * as fs from "node:fs/promises";
import userModel from "../models/usuarioModel.js";

export const datosValidador = (schema) => async (req, res, next) => {
  try {
    schema.parse(Object.assign({}, req.body));
    next();
  } catch (error) {
    await fs.unlink("./public/uploads/" + req.file.filename);
    res.status(406).json({ mensaje: error.errors.map((err) => err.message) });
  }
};

export const duplicidadValidador = async (req, res, next) => {
  try {
    const userFound = await userModel.findOne({ correo: req.body.correo });

    if (userFound) {
      await fs.unlink("./public/uploads/" + req.file.filename);
      return res.status(406).json({ mensaje: ["el usuario ya existe"] });
    }

    next();
  } catch (error) {
    res.status(500).json({ mensaje: [error.message] });
  }
};

export const fotoValidador = async (req, res, next) => {
  try {
    if (!req.file) return res.status(406).json({ mensaje: ["foto requerida"] });

    const mimetypes = ["image/png", "image/jpg", "image/jpeg"];

    if (!mimetypes.includes(req.file.mimetype)) {
      await fs.unlink("./public/uploads/" + req.file.filename);

      return res
        .status(406)
        .json({ mensaje: ["formato de imagen no aceptada"] });
    }

    next();
  } catch (error) {
    res.status(500).json({ mensaje: [error.message] });
  }
};

// login validador

export const loginDataValidador = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(406).json({ mensaje: error.errors.map((err) => err.message) });
  }
};

