import userModel from "../models/usuarioModel.js";
import bcrypt from "bcryptjs";
import crearToken from "../libs/jwt.js";

export const saveUser = async (req, res) => {
  try {
    // const obj = JSON.parse(JSON.stringify(req.body));
    // const obj = Object.assign({}, req.body)

    const { nombre, apellido, usuario, correo, clave } = req.body;

    const claveHash = await bcrypt.hash(clave, 10);

    const newUser = new userModel({
      nombre,
      apellido,
      usuario,
      correo,
      clave: claveHash,
      foto: "/uploads/" + req.file.filename,
    });

    const userSaved = await newUser.save();

    res.status(201).json(userSaved);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ mensaje: [error.message] });
  }
};

export const logninUser = async (req, res) => {
  try {
    const { correo, clave } = req.body;

    const userFound = await userModel.findOne({ correo: correo });

    if (!userFound)
      return res.status(406).json({ mensaje: ["usuario no encontrado"] });

    const claveMatch = await bcrypt.compare(clave, userFound.clave);
    if (!claveMatch)
      return res.status(406).json({ mensaje: ["clave invalida"] });

    const token = await crearToken({ id: userFound._id });

    // OJO no es seguro configurar de esta manera
    res.cookie("token", token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
    });

    res.status(202).json({
      id: userFound._id,
      nombre: userFound.nombre,
      apellido: userFound.apellido,
      correo: userFound.correo,
      foto: userFound.foto,
      created: userFound.createdAt,
      updated: userFound.updatedAt,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ mensaje: [error.message] });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ mensaje: [error.message] });
  }
};

export const profileUser = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) return res.status(403).json({ mensaje: ["id requerido"] });

    const userFound = await userModel.findById(id);

    res.status(200).json({
      id: userFound._id,
      nombre: userFound.nombre,
      apellido: userFound.apellido,
      correo: userFound.correo,
      foto: userFound.foto,
      created: userFound.createdAt,
      updated: userFound.updatedAt,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ mensaje: [error.message] });
  }
};

export const foundUser = async (req, res) => {
  try {
    const rows = !req.params.id
      ? await userModel.find()
      : await userModel.findById(req.params.id);

    res.status(200).json(rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ mensaje: [error.message] });
  }
};
