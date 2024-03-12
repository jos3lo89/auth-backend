import { config } from "dotenv";

config();

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;
export const CLIENT_URL = process.env.CLIENT_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
