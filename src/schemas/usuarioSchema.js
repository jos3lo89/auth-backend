import { z } from "zod";

export const userScehmaZ = z.object({
  nombre: z
    .string({
      required_error: "nombre requirido",
    })
    .refine((nombre) => nombre.length >= 1, {
      message: "el nombre no puede estar vacio",
    }),
  apellido: z
    .string({
      required_error: "apellido requirido",
    })
    .refine((nombre) => nombre.length >= 1, {
      message: "el apellido no puede estar vacio",
    }),
  usuario: z
    .string({
      required_error: "usuario requirido",
    })
    .max(15, { message: "usuario maximo de 15 caracteres" })
    .refine((nombre) => nombre.length >= 1, {
      message: "el usuario no puede estar vacio",
    }),
  correo: z
    .string({
      required_error: "correo requirido",
    })
    .email({ message: "correo no valido" })
    .refine((nombre) => nombre.length >= 1, {
      message: "el correo no puede estar vacio",
    }),
  clave: z
    .string({
      required_error: "contraseña requirido",
    })
    .min(6, { message: "la contraseña  minima de 6 caracteres" }),
});

export const userLoginDataZ = z.object({
  correo: z
    .string({
      required_error: "correo requirido",
    })
    .email({ message: "correo no valido" })
    .refine((nombre) => nombre.length >= 1, {
      message: "el correo no puede estar vacio",
    }),
  clave: z
    .string({
      required_error: "contraseña requirido",
    })
    .min(6, { message: "la contraseña  minima de 6 caracteres" }),
});
