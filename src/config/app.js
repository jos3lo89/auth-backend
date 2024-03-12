import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { CLIENT_URL } from "./config.js";
import userRouter from "../routes/usuario.routes.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", userRouter);

app.use((req, res) => {
  res.status(404).json({ mensaje: ["Not Found"] });
});

export default app;
