import { Router } from "express";
import {
  foundUser,
  logninUser,
  logoutUser,
  profileUser,
  saveUser,
} from "../controllers/usuarioController.js";
import fotoUser from "../middleware/multer.js";
import {
  datosValidador,
  duplicidadValidador,
  fotoValidador,
  loginDataValidador,
} from "../middleware/datosUserValidador.js";
import { userLoginDataZ, userScehmaZ } from "../schemas/usuarioSchema.js";
import { authValidator } from "../middleware/authValidator.js";

const userRouter = Router();

// Ruta guardadr ususario

userRouter.post(
  "/users",
  authValidator,
  fotoUser,
  fotoValidador,
  datosValidador(userScehmaZ),
  duplicidadValidador,
  saveUser
);

// ruta para iniciar sesión

userRouter.post("/users/login", loginDataValidador(userLoginDataZ), logninUser);

userRouter.post("/users/logout", authValidator, logoutUser);
userRouter.get("/users/profile", authValidator, profileUser);
userRouter.get("/users/allusers", authValidator, foundUser);

export default userRouter;
